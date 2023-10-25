let token = '6882549733:AAH5Q7HVCR-vhgnd634UBmIemY4mdh6AQ8o';

let TelegramBot = require('node-telegram-bot-api');

let bot = new TelegramBot(token, { polling: true});

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
    response = `Current EUR-hryvna rate:
    Buy: ${eur.rateBuy}
    Sell: ${eur.rateSell}`
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
    response = `Current USD-hryvna rate:
    Buy: ${usd.rateBuy}
    Sell: ${usd.rateSell}`
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