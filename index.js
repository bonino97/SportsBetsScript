'use strict';
const schedule = require('node-schedule');
const { parse } = require('json2csv');

const { API_FOOTBALL_LEAGUES_ENUM, API_FOOTBALL_LEAGUES_ENUM_REVERSE } = require('./apis/API-Football-Beta/enums');
const { getApiFootballBetaRequest } = require('./apis/API-Football-Beta/query');
const { getApiResultsHandled } = require('./utils/results');
const { getStatistics } = require('./utils/statistics');
const { writeFileSync } = require('./utils/files');
const { sendTelegramMessage } = require('./utils/telegram');
const { createTelegramMessage } = require('./utils/message');

const fetchApiFootballBetaData = async () => {
    const globalStatistics = [];
    // Create Date for Tomorrow. Format: YYYY-MM-DD
    const today = new Date();
    const addOneDayToDate = today.setDate(today.getDate() + 1);
    const date = new Date(addOneDayToDate).toISOString().slice(0, 10);

    // Convert enum into array
    const leagues = Object.values(API_FOOTBALL_LEAGUES_ENUM);

    // Iterate leagues array
    for (const league of leagues) {
        console.info(`Fetching data for ${league}...`);
        const query = `odds?league=${league}&season=2022&date=${date}`;
        const data = await getApiFootballBetaRequest(query);
        const results = await getApiResultsHandled(data);
        const statistics = await getStatistics(results);

        // Check if there is data for the league.
        if (statistics?.length === 0) {
            console.info(`No data for ${league}...`);
            continue;
        }

        // globalStatistics?.push(...statistics, { fecha: date, liga: API_FOOTBALL_LEAGUES_ENUM_REVERSE[league] });
        // const csvGlobal = parse(globalStatistics);

        // Validate if ./results/date folder exists if not create it.
        writeFileSync(`./results/${date}/json/result-${API_FOOTBALL_LEAGUES_ENUM_REVERSE[league]}-${date}.json`, JSON.stringify(statistics, null, 2))

        // JSON to CSV
        const csv = parse(statistics);
        writeFileSync(`./results/${date}/csv/result-${API_FOOTBALL_LEAGUES_ENUM_REVERSE[league]}-${date}.csv`, csv);

        for (const statistic of statistics) {
            const message = await createTelegramMessage(statistic, date, API_FOOTBALL_LEAGUES_ENUM_REVERSE[league]);
            await sendTelegramMessage(message);
        }
    }

    return;
}

const main = async () => {
    await fetchApiFootballBetaData();
}

// main();

// execute main() function everyday at 19:00 pm (UTC) 

schedule.scheduleJob('0 32 21 * * *', async () => {
    await main();
});


