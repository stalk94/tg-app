const ngrok = require('ngrok');


(async function () {
    const url = await ngrok.connect({
        addr: 3000
    });

    console.log(`🚀 Ngrok запущен: ${url}`);
})();