const createTelegramMessage = async (object, date, league) => {
    const message = `
<b>🔜 Fecha:</b> ${date}
<b>🔜 Liga:</b> ${league}
<b>🔜 Equipo Local:</b> ${object?.equipoLocal}
<b>🔜 Equipo Visitante:</b> ${object?.equipoVisitante}
<b>🔜 Prediccion Ganador:</b> ${object?.prediccionGanador}
<b>🔜 Comentario Aviso:</b> ${object?.comentarioAviso}
<b>🔜 Posibilidad De Empate:</b> ${object?.posibilidadDeEmpate}
<b>🔜 Equipo Local Porcentaje En Las Estadisticas:</b> ${object?.equipoLocalPorcentajeEnLasEstadisticas}
<b>🔜 Equipo Visitante Porcentaje En Las Estadisticas:</b> ${object?.equipoVisitantePorcentajeEnLasEstadisticas}
<b>🔜 Equipo Local Promedio De Casas De Apuestas:</b> ${object?.equipoLocalPromedioDeCasasDeApuestas}
<b>🔜 Empate Promedio De Casas De Apuestas:</b> ${object?.empatePromedioDeCasasDeApuestas}
<b>🔜 Equipo Visitante Promedio De Casas De Apuestas:</b> ${object?.equipoVisitantePromedioDeCasasDeApuestas}`
    return message;
}
module.exports = { createTelegramMessage };