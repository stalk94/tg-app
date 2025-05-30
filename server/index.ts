require('dotenv').config();
import { SupabaseAdapter } from './utils/adapter';


const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
global.db = new SupabaseAdapter<Schema>({key: SUPABASE_KEY, url: SUPABASE_URL});


