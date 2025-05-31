import { WebApp } from "../tg";


const theme = WebApp.theme ?? {
    bg_color: '#2c234a14',
    text_color: '#000000',
    hint_color: '#888888',
    link_color: '#1d8ae2',
    button_color: '#1d8ae2',
    button_text_color: '#ffffff',
    secondary_bg_color: '#f0f0f074',
}


export const style = {
    '--rbc-bg': theme.bg_color,
    '--rbc-text': theme.text_color,
    '--rbc-header-bg': theme.secondary_bg_color,
    '--rbc-event-bg': theme.button_color,
    '--rbc-event-color': theme.button_text_color,
} as React.CSSProperties;