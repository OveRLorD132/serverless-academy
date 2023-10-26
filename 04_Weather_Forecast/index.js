let token = '6777283312:AAHC9MbPJJf_sH44hKBKwdIHKtk9LkF4voM';

let apiKey = '5824e56af6d67a4e0414071d9c431fad';

let TelegramBot = require('node-telegram-bot-api');

let bot = new TelegramBot(token, { polling: true});

let axios = require('axios');

let formatWeather = require('./format-weather');
let formatCurrentWeather = require('./format-current-weather');

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
  let weather = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=47.3769&lon=8.5417&appid=${apiKey}`
  )
  let weatherList = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=47.3769&lon=8.5417&appid=${apiKey}`
  )
  weatherList = weatherList.data.list.slice(0, 8);
  if(interval === 6) weatherList = weatherList.filter((_, index) => index % 2 === 0);
  weatherList = weatherList.map((elem) => formatWeather(elem))
  return `Weather in Zurich:\nNow: ${formatCurrentWeather(weather.data)}\nWeather hourly:\n${weatherList.join('\n')}`;
}

async function sendHelpMessage() {
  return `Hello! It's a simple weather bot to get weather from Zurich. There is two options:
  1. Type or click 'Get weather for each 3 hours'
  2. Type or click 'Get weather for each 6 hours'`;
}

