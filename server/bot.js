require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');


const TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = 'https://4c30-2003-ce-4740-5a90-245f-bfda-74e2-259d.ngrok-free.app'; // сюда вставь свой URL
const bot = new TelegramBot(TOKEN, { polling: true });


fetch(`https://api.telegram.org/bot${TOKEN}/setChatMenuButton`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		menu_button: {
			type: "web_app",
			text: "Автошкола",
			web_app: {
				url: WEB_APP_URL
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
