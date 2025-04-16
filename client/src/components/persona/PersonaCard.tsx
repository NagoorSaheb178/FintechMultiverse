import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { PersonaType } from '@/types';
import { personaData } from '@/lib/utils';
import { motion } from 'framer-motion';
import { usePersona } from '@/context/PersonaContext';

interface PersonaCardProps {
  type: PersonaType;
}

const PersonaCard: FC<PersonaCardProps> = ({ type }) => {
  const { selectedPersona, setPersona, isPending } = usePersona();
  const persona = personaData[type];
  const isSelected = selectedPersona === type;

  return (
    <motion.div 
      className={`persona-card bg-dark border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 cursor-pointer ${
        isSelected ? 'border-primary border-2' : 'border-white/10 hover:border-primary/50'
      }`}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => setPersona(type)}
    >
      <div className="h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={persona.icon} />
          </svg>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{persona.title}</h3>
          <div className={`w-10 h-10 rounded-full ${persona.bgColor} flex items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${persona.textColor}`} viewBox="0 0 20 20" fill="currentColor">
              <path d={persona.icon} />
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mb-6">
          {persona.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {persona.tags.map((tag, index) => (
            <span key={index} className={`text-xs ${persona.bgColor} ${persona.textColor} px-3 py-1 rounded-full`}>
              {tag}
            </span>
          ))}
        </div>
        <Button
          disabled={isPending}
          className={`w-full py-3 bg-gradient-to-r ${persona.gradientFrom} ${persona.gradientTo} text-white rounded-lg font-semibold transition-all ${
            isPending ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isPending ? 'Selecting...' : `Select This Vibe`}
        </Button>
      </div>
    </motion.div>
  );
};

export default PersonaCard;
