'use strict';

const axios = require("axios");

const URL = 'https://api-football-beta.p.rapidapi.com';
// const API_KEY = '98160425b4msh3b24e1f1ea93e40p158e30jsnf726a2fe3890'; //j97
// const API_KEY = 'f8ea566625msh46ddd32fc5f380fp1a5644jsnb3dbf932a460'; //chck
// const API_KEY = 'f79eb04a48mshccef8cf9bfb31c0p1d6a9djsnf0e0f8ddf489'; //j24
// const API_KEY = 'a8a2c7b8eemshdd8c2b0082490d9p172edajsn143c1991ce48'; //b97
const API_KEY = '8b381e3272mshc73c6764f582d70p1bfa8ejsn465cbb43c302' //jcbo

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
        console.error('Error getting data from API', error);
        return;
    }
}

module.exports = {
    getApiFootballBetaRequest
}


