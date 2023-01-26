'use strict';
const fs = require('fs');
const { parse } = require('json2csv');
const { API_FOOTBALL_LEAGUES_ENUM, API_FOOTBALL_LEAGUES_ENUM_REVERSE } = require('./apis/API-Football-Beta/enums');
const { ODDS_ENUM } = require('./enums/odds');
const { getApiFootballBetaRequest } = require('./apis/API-Football-Beta/query');
const { getOdds, getOddsValues, getOddsAverage } = require('./utils/odds');
const { getApiResultsHandled } = require('./utils/results');
const { writeFileSync } = require('./utils/files');

const fetchApiFootballBetaData = async () => {
    // Create Date for Tomorrow. Format: YYYY-MM-DD
    const today = new Date();
    const addOneDayToDate = today.setDate(today.getDate() + 1);
    const date = new Date(addOneDayToDate).toISOString().slice(0, 10);

    // Convert enum into array
    const leagues = Object.values(API_FOOTBALL_LEAGUES_ENUM);

    // Iterate leagues array
    for (const league of leagues) {
        console.log(`Fetching data for ${league}...`);
        const query = `odds?league=${league}&season=2022&date=${date}`;
        const data = await getApiFootballBetaRequest(query);
        const results = await getApiResultsHandled(data);
        const statistics = await getStatistics(results);

        // Check if there is data for the league.
        if (statistics?.length === 0) {
            console.log(`No data for ${league}...`);
            continue;
        }

        // Validate if ./results/date folder exists if not create it.
        writeFileSync(`./results/${date}/json/result-${API_FOOTBALL_LEAGUES_ENUM_REVERSE[league]}-${date}.json`, JSON.stringify(statistics, null, 2))

        // JSON to CSV
        const csv = parse(statistics);
        writeFileSync(`./results/${date}/csv/result-${API_FOOTBALL_LEAGUES_ENUM_REVERSE[league]}-${date}.csv`, csv);
    }

    return;
}

const getStatistics = async (results) => {
    if(!results || results?.length === 0) return [];
    
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


const main = async () => {
    await fetchApiFootballBetaData();
}

main();