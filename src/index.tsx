import React from 'react';
import { createRoot } from 'react-dom/client';
import { initTelegram, WebApp } from "./tg";



export function App() {
    const [bgColor, setBgColor] = React.useState('#534f58');

    React.useEffect(() => {
        const tg = initTelegram();

        if (!tg) {
            console.warn("Telegram SDK не инициализирован");
            return;
        }

        WebApp.expand();
        WebApp.MainButton.setText("Записаться");
        WebApp.MainButton.show();
        WebApp.MainButton.onClick(() => {
            WebApp.user?.id
            alert(`Спасибо, ${WebApp.user?.first_name ?? "гость"}!`);
        });

        const themeBg = tg?.themeParams?.bg_color ?? '#534f58';
        setBgColor(themeBg);
    }, []);


    return (
        <div style={{ backgroundColor: bgColor, minHeight: '100vh', padding: 20 }}>
            <video
                src="https://files.catbox.moe/vzzsu6.mp4"          // без ../public — путь идёт из public/
                autoPlay
                muted
                playsInline
                loop
                style={{ width: '100%', borderRadius: 8 }}
            />
        </div>
    );
}



createRoot(document.querySelector(".root")).render(<App/>);