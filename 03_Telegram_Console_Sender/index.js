let TelegramBot = require('node-telegram-bot-api');

let fs = require('fs');

let env = JSON.parse(fs.readFileSync('./env.json', 'utf-8'));

let bot = new TelegramBot(env.telegram_bot_tocken, { polling: true });

let { program } = require('commander');

program.command('send-message')
  .description('Send a message to Telegram')
  .argument('<string>', 'message to send')
  .action((str) =>  {
    bot.sendMessage(env.chat_id, str).then(() => {process.exit(0)})  
})

program.command('send-image')
  .description('Enter a path of image to load')
  .argument('<string>', 'message to send')
  .action(async (str) => {
    bot.sendPhoto(env.chat_id, str, {}, { contentType: "image/*"}).then(() => {process.exit(0)})
  })


program.command('help')
  .description('Describe how program works')
  .action(() => {
    console.log(`Hello! This is simple application which allows you to perform actions like:
    1. Send you a message from console using send-message command: node index.js send-message SomeText
    2. Send you an image by chosen path using send-image command: node index.js send-image path/to/image
    3. Use help command to show this message`);
    process.exit(0)
  })

program.showHelpAfterError(`Unknown command, use 'help' command to get additional information: node index.js help`);

program.parse();