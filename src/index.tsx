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
            alert(`Спасибо, ${WebApp.user?.first_name ?? "гость"}!`);
        });
    }, []);


    return (
        <div style={{ padding: 20 }}>
            <h2>Добро пожаловать, {WebApp.user?.first_name ?? "Гость"}</h2>
            <p>Это Telegram Web App. Нажмите кнопку ниже.</p>
        </div>
    );
}



createRoot(document.querySelector(".root")).render(<App/>);