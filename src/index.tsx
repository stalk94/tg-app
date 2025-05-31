import React from 'react';
import { createRoot } from 'react-dom/client';
import { initTelegram, WebApp, TelegramWebApp } from "./tg";
import { context } from './context';
import Calendar from './component/calendar';

export function App() {
    const [tg, settg] = React.useState<TelegramWebApp>();
    const [authorise, setAuthorise] = React.useState(false);
    const [error, setError] = React.useState();

    const fetchTg =()=> {
        fetch('/tg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': WebApp.initDataRaw ?? ''
            },
            body: JSON.stringify({
                initData: WebApp.initDataRaw
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) setError(data.error);
            else if(data) setAuthorise(true);
        });
    }
    React.useEffect(() => {
        const tg = initTelegram();
        settg(tg);

        if (!tg) {
            console.warn("Telegram SDK не инициализирован");
            return;
        }
        
        if(false) fetchTg();
    }, []);

    
    return (
        <div style={{ backgroundColor: tg?.themeParams?.bg_color??'#534f58', minHeight: '100%' }}>
            <Calendar />
        </div>
    );
}



createRoot(document.querySelector(".root")).render(<App/>);