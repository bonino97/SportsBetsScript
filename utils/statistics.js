const { getOdds, getOddsValues, getOddsAverage } = require('../utils/odds');
const { ODDS_ENUM } = require('../enums/odds');

const getStatistics = async (results) => {
    if (!results || results?.length === 0) return [];

    const statistics = [];
    // Iterate results array
    for (const result of results) {

        // Same consts and functions but in one line
        const [homeBookmakerAverage, drawBookmakerAverage, awayBookmakerAverage] = await Promise.all([
            getOddsAverage(await getOddsValues(await getOdds(result?.bookmaker, ODDS_ENUM.home))),
            getOddsAverage(await getOddsValues(await getOdds(result?.bookmaker, ODDS_ENUM.draw))),
            getOddsAverage(await getOddsValues(await getOdds(result?.bookmaker, ODDS_ENUM.away)))
        ]);

        statistics.push({
            equipoLocal: result?.fixture?.teams?.home?.name,
            equipoVisitante: result?.fixture?.teams?.away?.name,
            prediccionGanador: result?.fixture?.predictions?.winner?.name,
            comentarioAviso: result?.fixture?.predictions?.advice,
            posibilidadDeEmpate: result?.fixture?.predictions?.win_or_draw,
            equipoLocalPorcentajeEnLasEstadisticas: result?.fixture?.comparison?.total?.home,
            equipoVisitantePorcentajeEnLasEstadisticas: result?.fixture?.comparison?.total?.away,
            equipoLocalPromedioDeCasasDeApuestas: homeBookmakerAverage,
            empatePromedioDeCasasDeApuestas: drawBookmakerAverage,
            equipoVisitantePromedioDeCasasDeApuestas: awayBookmakerAverage,
        });
    }
    return statistics;
}


module.exports = {
    getStatistics
}