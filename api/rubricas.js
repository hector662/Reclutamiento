// Rúbricas de entrevista de Mercanto, transcritas de las guías en Google Sheets.
// BDR: https://docs.google.com/spreadsheets/d/1zdNFlvZD72xJfZzcUoqq6UruBTZcKhgExVwodQyvti8
// KAM: https://docs.google.com/spreadsheets/d/1fiYayWTyCnP4MK8DZIP-eJHgMfiOb69PEAPKxDRVpQI
//
// Cada bloque se ancla a uno de los cuatro criterios del tablero (Cultura,
// Experiencia, Comunicacion, Potencial) para que las estrellas salgan de las
// mismas preguntas que se hacen en vivo.

export const RUBRICAS = {
  BDR: {
    rol: 'BDR',
    duracion: '45 min · outbound + soft skills',
    bloques: [
      {
        nombre: 'Prospección y actividad',
        criterio: 'Experiencia',
        preguntas: [
          { p: 'Descríbeme tu día de ayer hora por hora, desde que abriste la computadora.', escuchar: 'Si no puede reconstruirlo, no tenía estructura. Busca bloques de prospección, no «un poco de todo».' },
          { p: '¿Cómo armabas tu lista? ¿De dónde salían los nombres y los teléfonos?', escuchar: 'Método propio vs. lista que le daban servida. En early stage la lista te la haces tú.' },
          { p: '¿Cuántos intentos le das a un prospecto antes de soltarlo y en qué canales?', escuchar: 'El promedio se rinde al segundo o tercero. Busca siete o más y multicanal.' }
        ]
      },
      {
        nombre: 'Role play: llamada en frío',
        criterio: 'Comunicacion',
        preguntas: [
          { p: 'SETUP: eres el dueño de una taquería de dos sucursales, contestas ocupado en plena hora pico. Tiene 30 segundos.', escuchar: 'Apertura clara en diez segundos, motivo de la llamada y permiso. Si arranca con «¿cómo está usted hoy?», ya perdió.' },
          { p: 'A media llamada: «mándame la info por WhatsApp y yo lo veo».', escuchar: 'La mayoría acepta y cuelga feliz. El bueno lo usa para ganar la cita.' },
          { p: 'Al cerrar: ¿pidió la cita con día y hora?', escuchar: '«¿Te late que platiquemos?» no es cierre. Busca «¿jueves a las 10 o viernes a las 4?».' }
        ]
      },
      {
        nombre: 'Coachability',
        criterio: 'Potencial',
        preguntas: [
          { p: 'Dale un feedback concreto del role play y vuelve a correr 60 segundos de la llamada.', escuchar: 'El ejercicio que más te va a decir: ¿lo aplica en el momento o repite lo mismo? Es el mejor predictor en BDR.' },
          { p: '¿Cuál fue el último feedback duro que te dieron y qué hiciste con él?', escuchar: 'Que nombre el cambio concreto, no «lo tomé muy bien».' },
          { p: '¿Cómo te gusta que te corrijan?', escuchar: 'Autoconocimiento, y qué tan caro va a salir gestionarlo.' }
        ]
      },
      {
        nombre: 'Ownership y accountability',
        criterio: 'Potencial',
        preguntas: [
          { p: 'Cuéntame de un mes en que no llegaste a tu meta. ¿Qué pasó y qué cambiaste al siguiente?', escuchar: 'El sujeto de las frases. Si la culpa es del lead, del precio o del mercado, ya contestó.' },
          { p: '¿De qué resultado eres el único responsable?', escuchar: 'En junior vale de la escuela o de otro trabajo, pero tiene que ser suyo.' },
          { p: 'Si le hablo a tu último jefe, ¿en qué me va a decir que le fallaste?', escuchar: 'Autoconocimiento sin ponerse a la defensiva.' }
        ]
      },
      {
        nombre: 'Drive y hustle',
        criterio: 'Potencial',
        preguntas: [
          { p: '¿Qué hiciste el mes pasado que nadie te pidió?', escuchar: 'Iniciativa sin permiso.' },
          { p: 'Cuéntame de algo que hayas conseguido a puro insistir.', escuchar: 'Puede ser fuera del trabajo. Lo que importa es cuántas veces volvió a intentar.' },
          { p: '¿Para qué quieres el dinero de la comisión?', escuchar: 'El motor concreto. El que no sabe para qué, no persigue el jueves a las seis.' }
        ]
      },
      {
        nombre: 'Resiliencia ante el no',
        criterio: 'Potencial',
        preguntas: [
          { p: '¿Cuántos «no» te comiste en tu peor semana y cómo llegaste al viernes?', escuchar: 'Que el número exista. El que dice «uf, muchos» no se mide ni se conoce.' },
          { p: 'Cuéntame del cliente más grosero que te tocó. ¿Qué hiciste justo después de colgar?', escuchar: '¿Siguiente llamada, o café de cuarenta minutos?' },
          { p: '¿Qué te dices después de veinte llamadas sin una sola cita?', escuchar: 'Discurso interno. Aquí se ve quién aguanta el piso de ventas.' }
        ]
      },
      {
        nombre: 'Team player y good vibes',
        criterio: 'Cultura',
        preguntas: [
          { p: '¿A quién de tu equipo anterior le pedías ayuda y con qué?', escuchar: 'Humildad para pedir. El que nunca pidió ayuda tampoco la da.' },
          { p: 'Vas arriba en el board y tu compañero abajo. ¿Qué haces?', escuchar: 'Compite sano y comparte lo que le funciona, o se guarda el truco.' },
          { p: '¿Qué dirían de ti los que se sientan a tu lado?', escuchar: 'Good vibes en el día a día, no en la entrevista.' }
        ]
      },
      {
        nombre: 'Disciplina y números propios',
        criterio: 'Experiencia',
        preguntas: [
          { p: 'Sin buscarlo: ¿cuántas llamadas, cuántas citas y cuántas cerradas la semana pasada?', escuchar: 'El bueno lo trae en la punta de la lengua. El que no, no se mide.' },
          { p: '¿Cómo llevabas tu seguimiento? Descríbeme cómo se veía tu pipeline.', escuchar: 'CRM, hoja o libreta: da igual el sistema, importa que exista uno.' },
          { p: 'De cada diez citas que agendabas, ¿cuántas se presentaban?', escuchar: 'Conciencia de tasa, no solo de volumen. Aquí ves si piensa en conversión.' }
        ]
      },
      {
        nombre: 'Etapa, ambición y estabilidad',
        criterio: 'Cultura',
        preguntas: [
          { p: '¿Qué esperas que esté roto aquí?', escuchar: 'Si dice «nada», no entendió a dónde viene.' },
          { p: '¿Dónde quieres estar en dieciocho meses?', escuchar: 'La ruta BDR → KAM: ¿la quiere y sabe lo que cuesta, o solo quiere un escritorio?' },
          { p: '¿Qué te haría quedarte tres años en un mismo lugar?', escuchar: 'Filtro anti-jumper en versión junior.' }
        ]
      },
      {
        nombre: 'Sus preguntas',
        criterio: 'Cultura',
        preguntas: [
          { p: '¿Qué me quieres preguntar?', escuchar: 'Que pregunte por la meta, cómo se gana la comisión y cómo se ve el paso a KAM. Si solo pregunta horario y home office, ya sabes.' }
        ]
      }
    ],
    notas: [
      'En perfil junior acepta ejemplos de fuera del trabajo, pero que sean suyos y con detalle: qué hizo, cuántas veces y cómo acabó.',
      'El guion aprendido dura dos preguntas; la tercera sobre el mismo tema lo rompe. Si las respuestas suenan a discurso sin nombres, números ni fechas, bájale al score.'
    ]
  },

  KAM: {
    rol: 'KAM',
    duracion: '45 min · consultividad + fit cultural',
    bloques: [
      {
        nombre: 'Consultividad',
        criterio: 'Experiencia',
        preguntas: [
          { p: 'Cuéntame la venta más difícil que hayas cerrado, pero empieza por cómo llegaste al cliente, no por el cierre.', escuchar: '¿Hubo descubrimiento real o saltó directo al cierre?' },
          { p: '¿Qué le preguntas a un cliente en los primeros diez minutos y por qué esas y no otras?', escuchar: 'Si no nombra tres propias sin pensarlo, es guion y no método.' },
          { p: '¿Cuándo fue la última vez que le dijiste a un cliente que tu producto no era para él?', escuchar: 'Consultivo real vs. transaccional. El entrenado casi nunca la trae.' }
        ]
      },
      {
        nombre: 'Role play',
        criterio: 'Comunicacion',
        preguntas: [
          { p: 'SETUP: restaurante de tres sucursales, el proveedor le falla los martes y el dueño cree que su problema es el precio.', escuchar: 'Que pregunte antes de proponer y llegue solo a que el problema no era el precio.' },
          { p: 'A media conversación: «lo checo con mi socio, pero él ya tiene proveedor y le da 8% más barato».', escuchar: '¿Se adapta o se aferra al pitch que traía?' },
          { p: 'Al cerrar: ¿qué te faltó preguntarme?', escuchar: 'Con método se autodiagnostica en diez segundos. De manual dice que estuvo bien.' }
        ]
      },
      {
        nombre: 'Ownership y accountability',
        criterio: 'Experiencia',
        preguntas: [
          { p: 'Cuéntame de un número que no alcanzaste. ¿Qué pasó?', escuchar: 'El sujeto de las frases. Si aparecen mercado, producto o marketing antes que él, ya contestó.' },
          { p: '¿De qué resultado en tu carrera eres el único responsable?', escuchar: 'Que pueda aislar algo suyo, no del equipo.' },
          { p: 'Si le hablo a tu último jefe y le pregunto en qué le fallaste, ¿qué me va a decir?', escuchar: 'Autoconocimiento sin ponerse a la defensiva.' }
        ]
      },
      {
        nombre: 'Drive y hustle',
        criterio: 'Potencial',
        preguntas: [
          { p: '¿Qué hiciste el mes pasado que nadie te pidió?', escuchar: 'Iniciativa sin permiso.' },
          { p: 'Cuéntame de una cuenta que perseguiste más de tres meses. ¿Cuántos toques fueron?', escuchar: 'Números concretos, no «muchos».' },
          { p: '¿Qué te movía a seguir insistiendo?', escuchar: 'El motor real: dinero, orgullo, familia, reto.' }
        ]
      },
      {
        nombre: 'Outside the box y pragmatismo',
        criterio: 'Potencial',
        preguntas: [
          { p: 'Dame un ejemplo donde el proceso oficial no servía y lo rompiste. ¿Qué pasó después?', escuchar: 'Criterio, no rebeldía: ¿midió consecuencias?' },
          { p: 'Mañana entras aquí sin CRM y sin base de datos. ¿Cómo llenas tu pipeline la primera semana?', escuchar: 'El de estructura se congela; el que construyó se emociona.' },
          { p: '¿Qué dejarías de hacer hoy si te quitara dos horas al día?', escuchar: 'Distingue actividad de resultado.' }
        ]
      },
      {
        nombre: 'Team player y good vibes',
        criterio: 'Cultura',
        preguntas: [
          { p: '¿Quién de tus equipos anteriores se vendría a trabajar contigo otra vez, y por qué esa persona?', escuchar: 'Que nombre a alguien y sepa por qué.' },
          { p: 'Cuéntame de un conflicto con alguien de otra área. ¿Cómo terminó?', escuchar: '¿Resolvió o escaló y se lavó las manos?' },
          { p: '¿Qué dirían de ti los de operaciones o logística? No tus pares de ventas, ellos.', escuchar: 'El IC cerrado no sabe qué piensan de él fuera de su equipo.' }
        ]
      },
      {
        nombre: 'Analítico',
        criterio: 'Potencial',
        preguntas: [
          { p: '¿Cómo decidías el lunes a qué cuenta le dedicabas la semana?', escuchar: '¿Criterio con números o corazonada?' },
          { p: 'Si tu cartera cae 15% este mes, ¿qué es lo primero que abres?', escuchar: 'Que tenga ruta de diagnóstico, no pánico.' },
          { p: 'Sin buscar nada: ¿cuántos restaurantes hay en tu zona y cuánto compra al mes uno mediano?', escuchar: 'No importa que atine; importa si razona con números en voz alta.' }
        ]
      },
      {
        nombre: 'Estabilidad y etapa',
        criterio: 'Cultura',
        preguntas: [
          { p: '¿Qué esperas que esté roto aquí?', escuchar: 'Si dice «nada», no entendió a dónde viene.' },
          { p: 'Cuéntame del proyecto más largo que aguantaste cuando se puso feo. ¿Por qué no te saliste?', escuchar: 'Filtro anti-jumper.' }
        ]
      },
      {
        nombre: 'Sus preguntas',
        criterio: 'Cultura',
        preguntas: [
          { p: '¿Qué me quieres preguntar?', escuchar: 'Solo comisión y prestaciones: ya sabes. Cartera, por qué se fue el KAM anterior, producto a seis meses: buena señal.' }
        ]
      }
    ],
    notas: [
      'El guion aprendido dura dos preguntas; la tercera sobre el mismo tema lo rompe. Si las respuestas suenan a discurso sin nombres, números ni fechas, bájale al score.'
    ]
  }
};

// El tablero solo tiene dos roles de venta senior y dos junior.
export function rubricaParaRol(rol){
  const r = (rol || '').toLowerCase();
  if(r.includes('kam') || r.includes('sales lead')) return RUBRICAS.KAM;
  return RUBRICAS.BDR;
}

// Guía de estrellas del tablero (1-5), igual que la que ve el equipo en la ficha.
export const GUIA_ESTRELLAS = [
  { crit: 'Cultura',      uno: 'No sabe qué busca o solo habla de sueldo.', tres: 'Tiene interés por aprender pero respuestas genéricas.', cinco: 'Busca retos, acepta feedback y habla de crecimiento.' },
  { crit: 'Experiencia',  uno: 'Nunca tomó iniciativa.',                    tres: 'Participó en proyectos universitarios.',                cinco: 'Lideró proyectos, emprendió, vendió algo o logró resultados aunque no fuera un empleo.' },
  { crit: 'Comunicacion', uno: 'Se pierde al explicar.',                    tres: 'Se entiende pero le falta estructura.',                 cinco: 'Es claro, ordenado y transmite ideas con seguridad.' },
  { crit: 'Potencial',    uno: 'Culpa a otros y no aprende.',               tres: 'Reconoce errores.',                                     cinco: 'Aprende rápido, toma acción y demuestra curiosidad.' }
];
