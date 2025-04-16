import { User, InsertUser, Persona, InsertPersona } from '../database/schema';
import { supabase } from './supabase';

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPersona(persona: InsertPersona): Promise<Persona>;
  getPersonaByUserId(userId: number | null | undefined): Promise<Persona | undefined>;
}

export class SupabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.error('Error fetching user by id:', error);
      return undefined;
    }
    
    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error || !data) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
    
    return data as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([insertUser])
      .select()
      .single();
    
    if (error || !data) {
      console.error('Error creating user:', error);
      throw new Error(`Failed to create user: ${error?.message}`);
    }
    
    return data as User;
  }

  async createPersona(insertPersona: InsertPersona): Promise<Persona> {
    const { data, error } = await supabase
      .from('personas')
      .insert([insertPersona])
      .select()
      .single();
    
    if (error || !data) {
      console.error('Error creating persona:', error);
      throw new Error(`Failed to create persona: ${error?.message}`);
    }
    
    return data as Persona;
  }

  async getPersonaByUserId(userId: number | null | undefined): Promise<Persona | undefined> {
    if (!userId) return undefined;
    
    const { data, error } = await supabase
      .from('personas')
      .select('*')
      .eq('userId', userId)
      .single();
    
    if (error || !data) {
      console.error('Error fetching persona by userId:', error);
      return undefined;
    }
    
    return data as Persona;
  }
}

// Fallback to DatabaseStorage when Supabase is not configured
let storage: IStorage;

try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    console.log('Using Supabase storage');
    storage = new SupabaseStorage();
  } else {
    throw new Error('Supabase credentials not available');
  }
} catch (error) {
  console.warn('Falling back to database storage:', error);
  
  // Import DatabaseStorage dynamically to avoid circular dependencies
  import('./db').then(({ db }) => {
    const { DatabaseStorage } = require('./local-storage');
    storage = new DatabaseStorage(db);
  }).catch(err => {
    console.error('Failed to initialize database fallback:', err);
    throw err;
  });
}

export { storage };