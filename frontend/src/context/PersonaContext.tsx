import React, { createContext, useContext, ReactNode, useState } from 'react';
import { PersonaType } from '../types';
import { savePersona } from '../lib/supabase';
import { apiRequest } from '../lib/queryClient';

interface PersonaContextProps {
  selectedPersona: PersonaType | null;
  setPersona: (persona: PersonaType) => Promise<void>;
  isPending: boolean;
}

const defaultContextValue: PersonaContextProps = {
  selectedPersona: null,
  setPersona: async () => {},
  isPending: false,
};

const PersonaContext = createContext<PersonaContextProps>(defaultContextValue);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const [isPending, setIsPending] = useState(false);

  console.log('PersonaProvider mounted');

  const setPersona = async (persona: PersonaType) => {
    try {
      setIsPending(true);
      
      // First create a test user if none exists (this is only for demo purposes)
      let userId: number;
      
      try {
        const userData = await apiRequest('/api/user/test', {
          method: 'POST'
        });
        userId = userData.id;
      } catch (error) {
        console.error('Error creating test user:', error);
        // For demo purposes, create a mock user ID
        userId = 1;
      }

      // For demo purposes, just set the persona locally without waiting for API
      console.log(`Selected persona: ${persona}`);
      setSelectedPersona(persona);
      
      // Try to use Supabase in the background
      try {
        const result = await savePersona(userId, persona);
        if (result) {
          console.log('Persona saved to Supabase:', result);
        }
      } catch (supabaseError) {
        console.warn('Supabase direct connection failed:', supabaseError);
        
        // Fallback to API in the background
        try {
          const response = await apiRequest('/api/persona', {
            method: 'POST',
            body: JSON.stringify({ type: persona, userId })
          });
          console.log('Persona saved via API:', response);
        } catch (apiError) {
          console.error('API fallback failed:', apiError);
        }
      }
    } catch (error) {
      console.error('Error setting persona:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <PersonaContext.Provider value={{ selectedPersona, setPersona, isPending }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}