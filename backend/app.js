require('dotenv')
// index.js
const TelegramBot = require('node-telegram-bot-api');

// Replace with your real token
const token = process.env.TELEGRAM_API_KEY;

// Create a bot that uses 'polling' to fetch new messages
const bot = new TelegramBot(token, { polling: true });

// Listen for /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '👋 Hello, welcome to your personal notes app where your notes are saved and encrypted.');
});
