/* ============================================================
   PARLA! — Quiz Engine (motor separado de la página)
   Lógica de preguntas, respuestas y puntaje en memoria.
   No renderiza HTML: expone funciones que la página consume.
   ============================================================ */

export function crearQuizEngine(preguntas) {
  let indiceActual = 0;
  let respuestasSeleccionadas = new Array(preguntas.length).fill(null);
  let correctas = 0;

  return {
    obtenerPreguntaActual: () => preguntas[indiceActual],
    obtenerIndice: () => indiceActual,
    obtenerTotal: () => preguntas.length,

    seleccionarRespuesta(opcionIndex) {
      respuestasSeleccionadas[indiceActual] = opcionIndex;
    },

    verificarRespuestaActual() {
      const pregunta = preguntas[indiceActual];
      const esCorrecta = respuestasSeleccionadas[indiceActual] === pregunta.respuestaCorrecta;
      if (esCorrecta) correctas++;
      return { esCorrecta, respuestaCorrecta: pregunta.respuestaCorrecta };
    },

    hayPreguntaSiguiente: () => indiceActual < preguntas.length - 1,

    avanzar() {
      if (indiceActual < preguntas.length - 1) indiceActual++;
    },

    obtenerResultadoFinal: () => ({ correctas, total: preguntas.length }),
  };
}