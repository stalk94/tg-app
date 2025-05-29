type ThemeParams = {
    bg_color: string;
    button_color: string;
    button_text_color: string;
    hint_color: string;
    link_color: string;
    secondary_bg_color: string;
    text_color: string;
}
type User = {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    allows_write_to_pm?: boolean;
    photo_url?: string;
}
type InitDataUnsafe = {
    user?: User;
    chat?: object;
    auth_date: number;
    hash: string;
    [key: string]: any;
}
type MainButtonType = {
    setText: (text: string) => void;
    onClick: (cb: () => void) => void;
    show: () => void;
    hide: () => void;
    isVisible: boolean;
}
type BackButtonType = {
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
}
type TelegramWebApp = {
    initData: string;
    initDataUnsafe: InitDataUnsafe;
    MainButton: MainButtonType;
    BackButton: BackButtonType;
    expand: () => void;
    isExpanded: boolean;
    themeParams: ThemeParams;
    version: string;
    platform: string;
    ready: () => void;
}

let tg: TelegramWebApp;



export function initTelegram(): TelegramWebApp {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        tg = window.Telegram.WebApp as TelegramWebApp;
        tg.ready();
        return tg;
    }
    return undefined;
}

export const WebApp = {
    get instance(): TelegramWebApp | null {
        return tg;
    },

    get user(): User | null {
        return tg?.initDataUnsafe?.user ?? null;
    },

    get theme(): ThemeParams | null {
        return tg?.themeParams ?? null;
    },

    expand() {
        tg?.expand();
    },

    MainButton: {
        setText(text: string) {
            tg?.MainButton?.setText(text);
        },
        show() {
            tg?.MainButton?.show();
        },
        hide() {
            tg?.MainButton?.hide();
        },
        onClick(cb: () => void) {
            tg?.MainButton?.onClick(cb);
        }
    },

    BackButton: {
        show() {
            tg?.BackButton?.show();
        },
        hide() {
            tg?.BackButton?.hide();
        },
        onClick(cb: () => void) {
            tg?.BackButton?.onClick(cb);
        }
    }
}