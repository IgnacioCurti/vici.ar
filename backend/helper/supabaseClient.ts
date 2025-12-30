import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY/SERVICE_ROLE_KEY in environment');
}

const supabase = createClient(supabaseUrl, supabaseKey);


// Use example
/*
const { data, error } = await supabase
  .from('Users')
  .select('*');

if (error) {
  console.error('Supabase error:', error.message);
} else {
  console.log('Connection OK:', data);
}
*/