require('dotenv').config();
import './bot';
import path from 'path';
import express, { Request, Response } from 'express';
import { SupabaseAdapter } from './utils/adapter';
import { withUser } from './utils/validate';

const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
global.db = new SupabaseAdapter<Schema>({key: SUPABASE_KEY, url: SUPABASE_URL});

const app = express();
app.use(express.json());
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));



app.get('/', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});
app.post('/tg', withUser, async (req: Request, res: Response) => {
    if (!req.user?.data) return res.status(400).json({ error: '❌ No user in initData' });
    
    return res.json({ 
        success: true, 
        data: req.user?.data 
    });
});



app.listen(3000, () => {
    console.log(`🚀 Server started`);
});