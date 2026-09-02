// POST /api/evaluar
// Recibe las notas o el transcript de Granola de una entrevista y devuelve un
// BORRADOR de evaluación calificado contra la guía del rol (BDR o KAM).
// No escribe nada: quien entrevistó revisa el borrador en la ficha y guarda.

import Anthropic from '@anthropic-ai/sdk';
import { rubricaParaRol, GUIA_ESTRELLAS } from './rubricas.js';

const MODEL = 'claude-opus-5';

// El endpoint gasta créditos de la API, así que solo se responde a peticiones
// que vienen del propio tablero.
const ORIGENES_OK = [
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/i,
  /^http:\/\/localhost(:\d+)?$/i,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/i
];

// La salida estructurada no admite tipos nulables como ['integer','null'];
// la forma que sí acepta es anyOf. Tampoco admite minimum/maximum ni maxItems,
// así que los rangos se declaran en la descripción y se acotan al recibir.
function nulable(description){
  return { anyOf: [{ type: 'integer' }, { type: 'null' }], description };
}
function entero1a5(crit){
  return nulable(`${crit}, de 1 a 5. null si ningún bloque de este criterio se tocó en la entrevista.`);
}

const ESQUEMA = {
  type: 'object',
  properties: {
    veredicto:  { type: 'string', enum: ['Strong Hire', 'Hire', 'No Hire', 'Strong No Hire'] },
    confianza:  { type: 'string', enum: ['Alta', 'Media', 'Baja'] },
    decision:   { type: 'string', enum: ['Yes', 'Maybe', 'No'] },
    resumen:    { type: 'string', description: 'Dos líneas: quién es, qué trae, por qué sí o por qué no.' },
    estrellas: {
      type: 'object',
      properties: {
        Cultura:      entero1a5('Cultura'),
        Experiencia:  entero1a5('Experiencia'),
        Comunicacion: entero1a5('Comunicación'),
        Potencial:    entero1a5('Potencial')
      },
      required: ['Cultura', 'Experiencia', 'Comunicacion', 'Potencial'],
      additionalProperties: false
    },
    bloques: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nombre: { type: 'string' },
          score:  nulable('4 excede · 3 cumple · 2 riesgo · 1 no cumple. null si no se tocó el tema.'),
          nota:   { type: 'string', description: 'Una o dos líneas con la evidencia textual. Vacío si el bloque no se tocó.' }
        },
        required: ['nombre', 'score', 'nota'],
        additionalProperties: false
      }
    },
    fortalezas: { type: 'array', items: { type: 'string' }, description: 'Hasta 3. No rellenes por rellenar.' },
    riesgos:    { type: 'array', items: { type: 'string' }, description: 'Hasta 3. Cada uno termina en «→ cómo lo mitigo».' },
    sin_cubrir: { type: 'array', items: { type: 'string' }, description: 'Bloques que la entrevista no tocó.' }
  },
  required: ['veredicto', 'confianza', 'decision', 'resumen', 'estrellas', 'bloques', 'fortalezas', 'riesgos', 'sin_cubrir'],
  additionalProperties: false
};

function sistema(rubrica){
  const bloques = rubrica.bloques.map(b => {
    const preguntas = b.preguntas
      .map(q => `    - ${q.p}\n      QUÉ ESCUCHAR: ${q.escuchar}`)
      .join('\n');
    return `  ${b.nombre.toUpperCase()}  (ancla el criterio "${b.criterio}")\n${preguntas}`;
  }).join('\n\n');

  const guia = GUIA_ESTRELLAS
    .map(g => `  ${g.crit} — 1: ${g.uno} · 3: ${g.tres} · 5: ${g.cinco}`)
    .join('\n');

  return `Eres parte del equipo de reclutamiento de Mercanto y calificas entrevistas de ${rubrica.rol} contra la guía oficial. Recibes las notas o el transcript de una entrevista real y devuelves un borrador de evaluación que una persona va a revisar antes de guardarlo.

GUÍA DE ENTREVISTA ${rubrica.rol} (${rubrica.duracion})
${bloques}

CÓMO SE CALIFICA CADA BLOQUE (1 a 4)
  4 excede · 3 cumple · 2 riesgo · 1 no cumple.
  Califica SOLO lo que realmente se observó en la conversación. Si un bloque no se
  tocó, su score es null, su nota va vacía y el nombre del bloque va en sin_cubrir.
  Nunca inventes una respuesta que el candidato no dio, ni infieras un score a
  partir del CV o del tono general.
  Un bloque en sin_cubrir NUNCA lleva score: no se tocó, así que no hay nada que
  calificar. Ponerle 1 sería castigar al candidato por una pregunta que nadie le
  hizo. Las dos listas tienen que ser coherentes entre sí.

CÓMO SALEN LAS ESTRELLAS DEL TABLERO (1 a 5)
${guia}
  Cada criterio se calcula solo con los bloques anclados a él arriba. Si ninguno de
  sus bloques se tocó, el criterio va en null — el tablero lo deja sin calificar.

CRITERIO DE PESO
${rubrica.notas.map(n => `  - ${n}`).join('\n')}
  - Cita evidencia textual en las notas de bloque. Una nota sin una frase concreta
    del candidato detrás no vale.
  - Sé exigente: 3 es cumplir el estándar, no es un elogio. Un 4 necesita evidencia
    específica con nombres, números o fechas.

DECISIÓN
  decision es lo que se escribe en el tablero: Yes, Maybe o No.
  Regla, en este orden:
  1. Si la confianza es Baja, o si quedaron sin cubrir bloques que cambiarían el
     veredicto, decision es Maybe sin importar el veredicto.
  2. Si no, Strong Hire y Hire → Yes; No Hire y Strong No Hire → No.
  Que el veredicto y la decisión no se contradigan sin una de esas dos razones.

Escribe todo en español de México, directo y sin relleno.`;
}

function usuario(rubrica, candidato, notas){
  const quien = [
    candidato?.nombre ? `Candidato: ${candidato.nombre}` : null,
    candidato?.rol ? `Vacante: ${candidato.rol}` : null,
    candidato?.entrevistador ? `Entrevistó: ${candidato.entrevistador}` : null
  ].filter(Boolean).join('\n');

  return `${quien}

Notas de la entrevista (Granola):
"""
${notas}
"""

Califica esta entrevista contra la guía de ${rubrica.rol}. Devuelve un bloque por
cada uno de los ${rubrica.bloques.length} bloques de la guía, en el mismo orden y con el mismo nombre.`;
}

// El esquema de salida no admite minimum/maximum, así que el rango se acota aquí.
function acotar(v, min, max){
  const n = Number(v);
  if(!Number.isFinite(n)) return null;
  return Math.min(max, Math.max(min, Math.round(n)));
}
function normalizar(ev){
  const e = ev.estrellas || {};
  ev.estrellas = {
    Cultura:      acotar(e.Cultura, 1, 5),
    Experiencia:  acotar(e.Experiencia, 1, 5),
    Comunicacion: acotar(e.Comunicacion, 1, 5),
    Potencial:    acotar(e.Potencial, 1, 5)
  };
  // Un bloque que no se tocó no puede traer calificación: un 1 de oficio ahí
  // hunde al candidato por una pregunta que nadie le hizo. Se hace valer la
  // coherencia en las dos direcciones.
  const sinCubrir = new Set((ev.sin_cubrir || []).map(s => (s || '').trim().toLowerCase()));
  ev.bloques = (ev.bloques || []).map(b => {
    const fuera = sinCubrir.has((b.nombre || '').trim().toLowerCase());
    const score = fuera ? null : acotar(b.score, 1, 4);
    return { ...b, score, nota: score == null ? '' : b.nota };
  });
  ev.sin_cubrir = ev.bloques.filter(b => b.score == null).map(b => b.nombre);

  ev.fortalezas = (ev.fortalezas || []).slice(0, 3);
  ev.riesgos = (ev.riesgos || []).slice(0, 3);
  return ev;
}

// El texto que se precarga en el comentario del evaluador.
function armarComentario(ev, rubrica){
  const l = [];
  l.push(`🤖 Borrador de IA sobre notas de Granola · guía ${rubrica.rol} · revisar antes de guardar`);
  l.push('');
  l.push(`Veredicto: ${ev.veredicto} · confianza ${ev.confianza}`);
  l.push('');
  l.push(ev.resumen);

  if(ev.fortalezas?.length){
    l.push('', 'FORTALEZAS');
    ev.fortalezas.forEach((f, i) => l.push(`${i + 1}. ${f}`));
  }
  if(ev.riesgos?.length){
    l.push('', 'RIESGOS');
    ev.riesgos.forEach((r, i) => l.push(`${i + 1}. ${r}`));
  }

  const calificados = (ev.bloques || []).filter(b => b.score != null);
  if(calificados.length){
    l.push('', 'POR BLOQUE (1-4)');
    calificados.forEach(b => l.push(`· ${b.nombre} — ${b.score}/4. ${b.nota}`));
  }
  if(ev.sin_cubrir?.length){
    l.push('', `No se cubrió en esta entrevista: ${ev.sin_cubrir.join(', ')}.`);
  }
  return l.join('\n');
}

// Los errores de la API vienen como JSON crudo; quien está evaluando a un
// candidato no tiene por qué leer eso. Se traduce a qué hacer al respecto.
function mensajeDeError(e){
  const crudo = e?.error?.error?.message || e?.message || '';
  if(/anthropic-workspace-id is required/i.test(crudo)){
    return 'La llave de la API está ligada a una identidad y le falta el workspace. En Vercel: agrega ANTHROPIC_WORKSPACE_ID, o reemplaza la llave por una de cuenta de servicio.';
  }
  if(e?.status === 401 || /authentication|invalid x-api-key/i.test(crudo)){
    return 'La llave de la API no es válida. Revisa ANTHROPIC_API_KEY en Vercel.';
  }
  if(e?.status === 429){
    return 'La API está saturada en este momento. Vuelve a intentar en un minuto.';
  }
  if(e?.status === 529 || (e?.status >= 500 && e?.status < 600)){
    return 'La API no respondió. Vuelve a intentar en un momento.';
  }
  if(e instanceof SyntaxError){
    return 'La evaluación llegó incompleta. Vuelve a intentar.';
  }
  return 'No se pudo evaluar la entrevista. Detalle para el log: ' + (crudo || 'sin detalle');
}

export default async function handler(req, res){
  if(req.method !== 'POST'){
    return res.status(405).json({ error: 'Usa POST.' });
  }
  const origen = req.headers.origin || '';
  if(origen && !ORIGENES_OK.some(re => re.test(origen))){
    return res.status(403).json({ error: 'Origen no permitido.' });
  }
  if(!process.env.ANTHROPIC_API_KEY){
    return res.status(500).json({ error: 'Falta la variable ANTHROPIC_API_KEY en Vercel.' });
  }

  const { rol, notas, candidato } = req.body || {};
  const texto = (notas || '').trim();
  if(texto.length < 200){
    return res.status(400).json({ error: 'Pega las notas completas de Granola: con menos de 200 caracteres no hay nada que calificar.' });
  }

  const rubrica = rubricaParaRol(rol || candidato?.rol);

  try{
    // Las llaves ligadas a una identidad exigen además el id del workspace;
    // las llaves normales del Console no lo necesitan y la variable se omite.
    const wsId = process.env.ANTHROPIC_WORKSPACE_ID;
    const client = new Anthropic(
      wsId ? { defaultHeaders: { 'anthropic-workspace-id': wsId } } : {}
    );
    const respuesta = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      output_config: {
        effort: 'high',
        format: { type: 'json_schema', schema: ESQUEMA }
      },
      system: sistema(rubrica),
      messages: [{ role: 'user', content: usuario(rubrica, candidato, texto) }]
    });

    if(respuesta.stop_reason === 'refusal'){
      return res.status(422).json({ error: 'El modelo no pudo evaluar estas notas.' });
    }

    const json = respuesta.content.find(b => b.type === 'text')?.text;
    if(!json) return res.status(502).json({ error: 'El modelo no devolvió una evaluación.' });

    const ev = normalizar(JSON.parse(json));
    return res.status(200).json({
      rol: rubrica.rol,
      decision: ev.decision,
      estrellas: ev.estrellas,
      comentario: armarComentario(ev, rubrica),
      detalle: ev
    });
  }catch(e){
    console.error('Error evaluando la entrevista', e);
    const status = e?.status && e.status >= 400 && e.status < 600 ? e.status : 502;
    return res.status(status).json({ error: mensajeDeError(e) });
  }
}
