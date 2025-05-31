import { SupabaseAdapter } from './utils/adapter';
import { User } from './services/user';


declare global {
    var db: SupabaseAdapter<Schema> | undefined;

    type ConfigAdapter = {
        url: string
        key: string
    }

    type TelegramUserData = {
        id: number
        first_name?: string
        last_name?: string
        username: string
        language_code: string
        allows_write_to_pm: boolean
        photo_url: string
    }
    type InitDataUnsafe = {
        user?: TelegramUserData;
        chat?: object;
        auth_date: number;
        hash: string;
        [key: string]: any;
    }
    type UserModel = {
        id: number
        username: string
        permision: 'user' | 'driver' | 'admin'
        tg_data?: TelegramUserData
    }
    type UserDbSchema = {
        [K in `user.${number}`]: UserModel;
    }
    type UserDbFields = {
        [K in `user.${number}.${string}`]: any;
    }
    
    type Schema = UserDbSchema & UserDbFields;
}

declare module 'express' {
    interface Request {
        user?: User;
    }
}