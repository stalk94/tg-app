import { SupabaseAdapter } from './utils/adapter';

declare global {
    var db: SupabaseAdapter<Schema> | undefined;

    type ConfigAdapter = {
        url: string,
        key: string
    }

    type UserDbSchema = {
        'user.id': number
    }
    type Schema = UserDbSchema;
}