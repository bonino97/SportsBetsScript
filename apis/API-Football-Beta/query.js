'use strict';

const axios = require("axios");

const URL = 'https://api-football-beta.p.rapidapi.com';
const API_KEY = '98160425b4msh3b24e1f1ea93e40p158e30jsnf726a2fe3890';

const getApiFootballBetaRequest = async (query) => {
    const options = {
        method: 'GET',
        url: `${URL}/${query}`,
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error(new Error('Error getting data from API', error));
        return;
    }
}

module.exports = {
    getApiFootballBetaRequest
}


