'use strict';
const fs = require('fs');
const { parse } = require('json2csv');
const { API_FOOTBALL_LEAGUES_ENUM, API_FOOTBALL_LEAGUES_ENUM_REVERSE } = require('./apis/API-Football-Beta/enums');
const { getApiFootballBetaRequest } = require('./apis/API-Football-Beta/query');
const { getApiResultsHandled } = require('./utils/results');
const { getStatistics } = require('./utils/statistics');
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

const main = async () => {
    await fetchApiFootballBetaData();
}

main();