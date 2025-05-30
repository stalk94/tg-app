require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');


const TOKEN = process.env.TOKEN;
const WEB_APP_URL = process.env.URL; // сюда вставь свой URL
const bot = new TelegramBot(TOKEN, { polling: true });


fetch(`https://api.telegram.org/bot${TOKEN}/setChatMenuButton`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		menu_button: {
			type: "web_app",
			text: "Автошкола",
			web_app: {
				url: process.env.URL
			}
		}
	})
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Открыть Web App:', {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: 'Открыть приложение',
                    web_app: { url: WEB_APP_URL }
                }
            ]]
        }
    });
});
