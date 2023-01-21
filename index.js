'use strict';
const fs = require('fs');
const { API_FOOTBALL_LEAGUES_ENUM } = require('./apis/API-Football-Beta/enums');
const { getApiFootballBetaRequest } = require('./apis/API-Football-Beta/query');

const fetchApiFootballBetaData = async () => {
    const date = new Date().toISOString().slice(0, 10);
    const query = `odds?league=${API_FOOTBALL_LEAGUES_ENUM.LA_LIGA}&season=2022&date=${date}`;
    const data = await getApiFootballBetaRequest(query);
    const results = await getResults(data);
    return results;
}

const getResults = async (data) => {
    const bets = data?.response?.map(element => {
        return {
            fixture: element?.fixture.id,
            bookmaker: element?.bookmakers?.map(bookmaker => {
                return {
                    name: bookmaker?.name,
                    bets: bookmaker?.bets.map(bet => {
                        if (bet?.name === 'Match Winner') {
                            return {
                                name: bet?.name,
                                values: bet?.values
                            }
                        }
                    }).filter(bet => bet !== undefined)
                }
            })
        }
    });

    for (const bet of bets) {
        const query = `predictions/?fixture=${bet?.fixture}`;
        const data = await getApiFootballBetaRequest(query);

        if (!data) {
            throw new Error('No data found');
        }

        if (data?.response?.length === 0) {
            throw new Error('No data found');
        }

        bet.fixture = data?.response?.map(element => {
            return {
                teams: {
                    home: element?.teams?.home?.name,
                    away: element?.teams?.away?.name
                },
                predictions: {
                    winner: element?.predictions?.winner,
                    advice: element?.predictions?.advice,
                    percents: element?.predictions?.percent,
                    drawPosibility: element?.predictions?.win_or_draw,
                }
            }
        });
    }

    return bets;
}

const main = async () => {
    await fetchApiFootballBetaData();
}

main();