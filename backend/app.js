require('dotenv').config()
// index.js
const TelegramBot = require('node-telegram-bot-api');
const express = require('express')


const app = express();

// Replace with your real token
const token = process.env.TELEGRAM_API_KEY;

// Create a bot that uses 'polling' to fetch new messages
const bot = new TelegramBot(token, { polling: true });

// Listen for /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, '👋 Welcome to Notez, your encrypted notes app.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📝 Open App",
            web_app: {
              url: "https://notez-lilac.vercel.app", // replace with your actual web app URL
            },
          },
        ],
      ],
    },
  });
});

bot.on('message', (msg) => {
  bot.sendMessage(msg.chat.id, 'I got your message!');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});