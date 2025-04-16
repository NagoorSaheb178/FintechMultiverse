import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { apiRequest } from '../lib/queryClient';
import { PersonaType } from '../types';
import { useToast } from '@/hooks/use-toast';

interface PersonaContextProps {
  selectedPersona: PersonaType | null;
  setPersona: (persona: PersonaType) => Promise<void>;
  isPending: boolean;
}

// Create the context with a default value to avoid undefined errors
const defaultContextValue: PersonaContextProps = {
  selectedPersona: null,
  setPersona: async () => {},
  isPending: false
};

const PersonaContext = createContext<PersonaContextProps>(defaultContextValue);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  // Log when the Provider mounts to ensure it's being rendered
  useEffect(() => {
    console.log("PersonaProvider mounted");
  }, []);

  const setPersona = async (persona: PersonaType) => {
    console.log("Setting persona:", persona);
    setIsPending(true);
    try {
      await apiRequest('POST', '/api/personas', { type: persona });
      setSelectedPersona(persona);
      toast({
        title: "Persona Selected",
        description: `You've selected the ${persona} persona.`,
      });
    } catch (error) {
      console.error('Failed to save persona', error);
      toast({
        title: "Error",
        description: "Failed to save your persona selection.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  const contextValue = { selectedPersona, setPersona, isPending };
  
  return (
    <PersonaContext.Provider value={contextValue}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  // Since we're providing a default value, this shouldn't be undefined anymore
  // but we'll keep the check as a safety measure
  if (!context) {
    console.error("usePersona: Context is undefined, this shouldn't happen");
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}
