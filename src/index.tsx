import React from 'react';
import { createRoot } from 'react-dom/client';
import { initTelegram, WebApp } from "./tg";



export function App() {
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
    }, []);


    return (
        <div style={{ padding: 20 }}>
            <video
                src="/test.mp4"          // без ../public — путь идёт из public/
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