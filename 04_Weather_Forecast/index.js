let token = '6777283312:AAHC9MbPJJf_sH44hKBKwdIHKtk9LkF4voM';

let TelegramBot = require('node-telegram-bot-api');

let bot = new TelegramBot(token, { polling: true});

let axios = require('axios');
const formatTemperature = require('./format-temperature');
const getWeatherEmoji = require('./get-weather-emoji');

bot.on('message', async (msg) => {
  let response;
  if(/^get weather for each 3 hours$/i.test(msg.text)) response = await getWeatherByInterval(3);
  else if(/^get weather for each 6 hours$/i.test(msg.text)) response = await getWeatherByInterval(6);
  else response = await sendHelpMessage();
  bot.sendMessage(msg.chat.id, response, {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: 'Get weather for each 3 hours'}],
        [{text: 'Get weather for each 6 hours'}]
      ]
    })
  });
})

async function getWeatherByInterval(interval) {
  let responseString = '';
  let weather = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=47.3769&longitude=8.5417&current_weather=true&hourly=temperature_2m&hourly=weathercode`
  );
  weather = formatTemperature(weather.data);
  weather = weather.filter((_, index) => (index + 1) % interval === 0);
  responseString = weather.map((elem) => `${elem.time}: ${elem.temperature}°, ${getWeatherEmoji(elem.code)} ${elem.weather}`).join('\n');
  return `Weather in Zurich:\n${responseString}`;
}

async function sendHelpMessage() {
  return `Hello! It's a simple weather bot to get weather from Zurich. There is two options:
  1. Type or click 'Get weather for each 3 hours'
  2. Type or click 'Get weather for each 6 hours'`;
}

