const mongoose = require("mongoose");

const requestsApiFootball = mongoose.Schema({
    endpoint: {
        type: String,
        required: false
    },
    request: {
        type: JSON,
        required: false
    },
}, { timestamps: true });

module.exports = mongoose.model('RequestsApiFootball', requestsApiFootball);