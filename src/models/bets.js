const mongoose = require("mongoose");

const BetsSchema = mongoose.Schema({
    date: {
        type: Date,
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
    drawProbabilityTeam: {
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

module.exports = mongoose.model('Bets', BetsSchema);