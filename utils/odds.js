const getOdds = async (bookmaker = [], valueComparer) => {
    if (bookmaker.length === 0) {
        return [];
    }

    return bookmaker?.map(bookmaker => {
        return bookmaker?.bets?.map(bet => {
            return bet?.values?.map(value => {
                if (value?.value === valueComparer) {
                    return value?.odd;
                }
            }).filter(value => value !== undefined);
        }).filter(bet => bet !== undefined);
    }).filter(bookmaker => bookmaker !== undefined);
    // Filter removes undefined values to clean array from empty values.
};

const getOddsValues = async (odds) => {
    if (odds.length === 0) {
        return [];
    }

    return odds?.map(odd => {
        if(odd?.length === 0) {
            return 0;
        }
        return odd?.reduce((a, b) => {
            return parseFloat(a) + parseFloat(b);
        }) / odd?.length;
    }).filter(odd => odd !== 0);
    // Filter removes 0 values to clean array from empty values.
}

const getOddsAverage = async (oddsValues) => {
    return oddsValues.reduce((a, b) => a + b, 0) / oddsValues.length;
}

module.exports = {
    getOdds,
    getOddsValues,
    getOddsAverage
}