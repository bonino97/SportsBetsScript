// Send to telegram bot

const axios = require('axios');
const TELEGRAM_BOT_TOKEN = '5969442244:AAEcQsKeh_vr-gFZ6MtqtrJmM0aZUKlPF2E';
const TELEGRAM_CHAT_ID = '-1001849701056';

const sendTelegramMessage = async (message) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const data = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
    };
    const response = await axios.post(url, data);
    return response;
};

module.exports = { sendTelegramMessage };