require('dotenv').config();
import TelegramBot from 'node-telegram-bot-api';


const TOKEN = process.TOKEN;
const WEB_APP_URL = 'https://your-deployed-app.vercel.app'; // сюда вставь свой URL

const bot = new TelegramBot(TOKEN, { polling: true });


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Открыть Web App:', {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: 'Перейти в автошколу',
                    web_app: { url: WEB_APP_URL }
                }
            ]]
        }
    });
});