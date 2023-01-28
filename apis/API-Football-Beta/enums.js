// Premier League - England - League Id = 39

const API_FOOTBALL_LEAGUES_ENUM = {
    PREMIER_LEAGUE: 39,
    LA_LIGA: 140,
    SERIE_A: 135,
    BUNDESLIGA: 78,
    LIGUE_1: 61,
    EREDIVISIE: 88,
    FA_CUP: 45,
    // CHAMPIONS_LEAGUE: 2,
    // EUROPA_LEAGUE: 3,
    // EFL_CUP: 41,
    // EPL: 39,
}
// Reverse enum
const API_FOOTBALL_LEAGUES_ENUM_REVERSE = {
    39: 'PREMIER_LEAGUE',
    140: 'LA_LIGA',
    135: 'SERIE_A',
    78: 'BUNDESLIGA',
    61: 'LIGUE_1',
    88: 'EREDIVISIE',
    45: 'FA_CUP',
}

module.exports = {
    API_FOOTBALL_LEAGUES_ENUM,
    API_FOOTBALL_LEAGUES_ENUM_REVERSE
}