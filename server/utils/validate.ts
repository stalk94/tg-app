import crypto from 'crypto';
import { Request, Response } from 'express';
import { User, create, findUser } from '../services/user';


export function validateInitData(initData: string, botToken: string): boolean {
    const urlSearchParams = new URLSearchParams(initData);
    const hash = urlSearchParams.get('hash');

    if (!hash) return false;

    urlSearchParams.delete('hash');

    const dataCheckString = Array.from(urlSearchParams.entries())
        .map(([key, value]) => `${key}=${value}`)
        .sort()
        .join('\n');

    const secret = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
    const computedHash = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

    return computedHash === hash;
}

export async function withUser(req: Request, res: Response, next) {
    const initData = req.headers.authorization;
    if (!initData || !validateInitData(initData, process.env.BOT_TOKEN!)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const userStr = new URLSearchParams(initData).get('user');
    if (!userStr) return res.status(400).json({ error: 'User not found in initData' });

    try {
        const userJson = JSON.parse(userStr);
        const userService = await findUser(userJson.id) ?? await create(userJson.id, {
            id: userJson.id,
            username: userJson.username,
            tg_data: userJson,
            permision: 'user'
        });

        req.user = userService;
        next();
    } 
    catch (err) {
        return res.status(400).json({ error: 'Invalid user JSON' });
    }
}