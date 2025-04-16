import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Make sure SUPABASE_URL and SUPABASE_ANON_KEY are set in your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);