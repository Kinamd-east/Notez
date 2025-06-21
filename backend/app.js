require('dotenv')
// index.js
const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const cors = require('cors')


const app = express();
app.use(cors());

// Replace with your real token
const token = process.env.TELEGRAM_API_KEY;

// Create a bot that uses 'polling' to fetch new messages
const bot = new TelegramBot(token, { polling: true });

// Listen for /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '👋 Hello, welcome to your personal notes app where your notes are saved and encrypted.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});