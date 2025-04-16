import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to get user profile
export async function fetchUserProfile(userId: number) {
  if (!userId) return null;
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
}

// Helper to fetch persona by user ID
export async function fetchPersona(userId: number) {
  if (!userId) return null;
  
  const { data, error } = await supabase
    .from('personas')
    .select('*')
    .eq('userId', userId)
    .single();
  
  if (error) {
    console.error('Error fetching persona:', error);
    return null;
  }
  
  return data;
}

// Helper to save persona
export async function savePersona(userId: number, personaType: string) {
  if (!userId || !personaType) return null;
  
  const { data, error } = await supabase
    .from('personas')
    .insert([{ userId, type: personaType }])
    .select()
    .single();
  
  if (error) {
    console.error('Error saving persona:', error);
    return null;
  }
  
  return data;
}