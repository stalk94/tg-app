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
            alert(`Спасибо, ${WebApp.user?.first_name ?? WebApp.user?.id}!`);
        });

        const themeBg = tg?.themeParams?.bg_color ?? '#534f58';
        setBgColor(themeBg);
    }, []);


    return (
        <div style={{ backgroundColor: bgColor, minHeight: '100%' }}>
            <pre>
                { JSON.stringify(WebApp.user, null, 2) }
            </pre>
        </div>
    );
}



createRoot(document.querySelector(".root")).render(<App/>);