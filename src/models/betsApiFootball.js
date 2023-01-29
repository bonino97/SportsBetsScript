const mongoose = require("mongoose");

const betsApiFootballSchema = mongoose.Schema({
    date: {
        type: String,
        required: false
    },
    league: {
        type: String,
        required: false
    },
    homeTeam: {
        type: String,
        required: false
    },
    awayTeam: {
        type: String,
        required: false
    },
    winnerTeam: {
        type: String,
        required: false
    },
    drawProbability: {
        type: Boolean,
        required: false,
        default: false
    },
    advice: {
        type: String,
        required: false
    },
    homeTeamPercentage: {
        type: String,
        required: false
    },
    awayTeamPercentage: {
        type: String,
        required: false
    },
    homeBookmakerAverage: {
        type: Number,
        required: false
    },
    drawBookmakerAverage: {
        type: Number,
        required: false
    },
    awayBookmakerAverage: {
        type: Number,
        required: false
    },
    oddResult: {
        type: String,
        required: false
    },
}, { timestamps: true });

module.exports = mongoose.model('BetsApiFootball', betsApiFootballSchema);