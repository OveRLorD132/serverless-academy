let fs = require('fs');

let env = JSON.parse(fs.readFileSync('./env.json', 'utf-8'));

let TelegramBot = require('node-telegram-bot-api');

let bot = new TelegramBot(env.bot_tocken, { polling: true});

let axios = require('axios');

let NodeCache = require( "node-cache" );
let walletCache = new NodeCache();

bot.on('message', async (msg) => {
  let response;
  if(/^eur$/i.test(msg.text)) {
    let eur;
    try {
      let currencyData = await axios.get('https://api.monobank.ua/bank/currency');
      currencyData.data.forEach((elem) => {
        if(elem.currencyCodeA === 840 && elem.currencyCodeB === 980) walletCache.set('USD', elem);
        if(elem.currencyCodeA === 978 && elem.currencyCodeB === 980) {
          eur = elem;
          walletCache.set('EUR', elem);
        }
      })
    } catch(err) {
      eur = walletCache.get('EUR');
    }
    response = `Current EUR-hryvna rate:\nBuy: ${eur.rateBuy}\nSell: ${eur.rateSell}`
  }
  else if(/^usd$/i.test(msg.text)) {
    let usd;
    try {
      let currencyData = await axios.get('https://api.monobank.ua/bank/currency');
      currencyData.data.forEach((elem) => {
        if(elem.currencyCodeA === 840 && elem.currencyCodeB === 980) {
          usd = elem;
          walletCache.set('USD', elem);
        }
        if(elem.currencyCodeA === 978 && elem.currencyCodeB === 980) walletCache.set('EUR', elem);
      })
    } catch(err) {
      usd = walletCache.get('USD')
    }
    response = `Current USD-hryvna rate:\nBuy: ${usd.rateBuy}\nSell: ${usd.rateSell}`
  }
  else response = `Type or click "USD" or "EUR" to get wallet rate.`
  bot.sendMessage(msg.chat.id, response, {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: 'USD'}],
        [{text: 'EUR'}]
      ]
    })
  });
})