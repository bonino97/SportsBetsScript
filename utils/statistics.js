const { getOdds, getOddsValues, getOddsAverage } = require('../utils/odds');
const { ODDS_ENUM, ODDS_ENUM_SPANISH } = require('../enums/odds');
const Bets = require('../src/models/bets');
const BetsApiFootball = require('../src/models/betsApiFootball');

const getStatistics = async (results, date, league) => {
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

        // Get the lower statistic between [home, draw, away]
        const lowerBookmaker = Math.min(homeBookmakerAverage, drawBookmakerAverage, awayBookmakerAverage);
        const lowerBookmakerName = lowerBookmaker === homeBookmakerAverage ? 'home' : lowerBookmaker === awayBookmakerAverage ? 'away' : 'draw';

        let noDrawName = '';
        let lowerBookmakerNoDrawTeam = '';

        if (lowerBookmaker === 'draw') {
            const lowerBookmakerNoDraw = Math.min(homeBookmakerAverage, awayBookmakerAverage);
            const lowerBookmakerNoDrawName = lowerBookmakerNoDraw === homeBookmakerAverage ? 'home' : 'away';
            lowerBookmakerNoDrawTeam = lowerBookmakerNoDrawName === 'home' ? result?.fixture?.teams?.home?.name : result?.fixture?.teams?.away?.name;
            noDrawName = `${ODDS_ENUM_SPANISH[lowerBookmaker]} & ${lowerBookmakerNoDrawTeam}`;
        }

        const betsApiFootballExists = await BetsApiFootball.findOne({
            date,
            league,
            homeTeam: result?.fixture?.teams?.home?.name,
            awayTeam: result?.fixture?.teams?.away?.name,
        });

        if (!betsApiFootballExists) {
            new BetsApiFootball({
                date,
                league,
                homeTeam: result?.fixture?.teams?.home?.name,
                awayTeam: result?.fixture?.teams?.away?.name,
                winnerTeam: result?.fixture?.predictions?.winner?.name,
                drawProbability: Boolean(result?.fixture?.predictions?.win_or_draw) ?? false,
                advice: result?.fixture?.predictions?.advice,
                homeTeamPercentage: result?.fixture?.comparison?.total?.home,
                awayTeamPercentage: result?.fixture?.comparison?.total?.away,
                homeBookmakerAverage: homeBookmakerAverage.toFixed(2),
                drawBookmakerAverage: drawBookmakerAverage.toFixed(2),
                awayBookmakerAverage: awayBookmakerAverage.toFixed(2),
            }).save();
        };

        const betsExists = await Bets.findOne({
            date,
            league,
            homeTeam: result?.fixture?.teams?.home?.name,
            awayTeam: result?.fixture?.teams?.away?.name,
        });

        if (!betsExists) {
            new Bets({
                date,
                league,
                homeTeam: result?.fixture?.teams?.home?.name,
                awayTeam: result?.fixture?.teams?.away?.name,
                winnerTeam: lowerBookmakerName === 'home' ? result?.fixture?.teams?.home?.name : lowerBookmakerName === 'away' ? result?.fixture?.teams?.away?.name : 'draw',
                drawProbability: Boolean(noDrawName) ?? false,
                drawProbabilityTeam: lowerBookmakerNoDrawTeam,
                homeBookmakerAverage: homeBookmakerAverage.toFixed(2),
                drawBookmakerAverage: drawBookmakerAverage.toFixed(2),
                awayBookmakerAverage: awayBookmakerAverage.toFixed(2),
            }).save();
        };

        statistics.push({
            fecha: date,
            liga: league,
            equipoLocal: result?.fixture?.teams?.home?.name,
            equipoVisitante: result?.fixture?.teams?.away?.name,
            prediccionGanadorAPI: result?.fixture?.predictions?.winner?.name,
            prediccionGanadorApuestas: ODDS_ENUM_SPANISH[lowerBookmakerName],
            comentarioAviso: result?.fixture?.predictions?.advice,
            posibilidadDeEmpate: Boolean(result?.fixture?.predictions?.win_or_draw) ? (noDrawName ? noDrawName : 'Probable') : 'No',
            equipoLocalPorcentajeEnLasEstadisticas: result?.fixture?.comparison?.total?.home,
            equipoVisitantePorcentajeEnLasEstadisticas: result?.fixture?.comparison?.total?.away,
            equipoLocalPromedioDeCasasDeApuestas: homeBookmakerAverage.toFixed(2),
            empatePromedioDeCasasDeApuestas: drawBookmakerAverage.toFixed(2),
            equipoVisitantePromedioDeCasasDeApuestas: awayBookmakerAverage.toFixed(2),
        });
    }

    return statistics;
}


module.exports = {
    getStatistics
}