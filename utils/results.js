const { getApiFootballBetaRequest } = require('../apis/API-Football-Beta/query');

const getApiResultsHandled = async (data) => {
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

    if (!bets || bets?.length === 0) {
        return;
    }

    for (const bet of bets) {
        const query = `predictions/?fixture=${bet?.fixture}`;
        const data = await getApiFootballBetaRequest(query);

        if (!data) {
            continue;
        }

        if (data?.response?.length === 0) {
            continue;
        }

        const fixture = data?.response?.map(element => {
            return {
                teams: {
                    home: element?.teams?.home,
                    away: element?.teams?.away
                },
                predictions: {
                    winner: element?.predictions?.winner,
                    advice: element?.predictions?.advice,
                    percents: element?.predictions?.percent,
                    win_or_draw: element?.predictions?.win_or_draw,
                    under_over: element?.predictions?.under_over
                },
                comparison: element?.comparison
            }
        });

        bet.fixture = fixture[0];
    }

    return bets;
}

module.exports = {
    getApiResultsHandled
}