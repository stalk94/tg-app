import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { context } from '../context';
import { style } from './theme';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendar.css';
import moment from 'moment';
import { defineRussianLocale } from './locale';

/////////////////////////////////////////////////////////////////
defineRussianLocale(moment);
moment.locale('ru');
const localizer = momentLocalizer(moment);
/////////////////////////////////////////////////////////////////

const ToolBar =({ label, onNavigate, onView, view, views, ...props })=> {
    
    return(
        <div>
            top bar
        </div>
    );
}


export default function() {
    const [events, setEvents] = React.useState([
        {
            title: 'Вождение',
            start: new Date(),
            end: new Date(),
        },
    ]);


    return(
        <div style={{ ...style }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '80vh' }}
                messages={{
                    today: 'Сегодня',
                    previous: 'Назад',
                    next: 'Вперёд',
                    month: 'Месяц',
                    week: 'Неделя',
                    day: 'День',
                    agenda: 'Повестка',
                    date: 'Дата',
                    time: 'Время',
                    event: 'Событие',
                    noEventsInRange: 'Нет событий',
                }}
                components={{
                    toolbar: ToolBar,
                }}
            />
        </div>
    );
}