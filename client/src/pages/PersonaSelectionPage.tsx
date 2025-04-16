import { FC } from 'react';
import Navbar from '@/components/layout/Navbar';
import PersonaCard from '@/components/persona/PersonaCard';
import ChatbotPlaceholder from '@/components/persona/ChatbotPlaceholder';
import { PersonaType } from '@/types';
import { motion } from 'framer-motion';

interface PersonaSelectionPageProps {
  onGetStarted: () => void;
}

const PersonaSelectionPage: FC<PersonaSelectionPageProps> = ({ onGetStarted }) => {
  const personaTypes: PersonaType[] = ['innovator', 'traditionalist', 'adventurer', 'athlete', 'artist'];

  return (
    <div className="min-h-screen bg-dark text-light">
      <Navbar onGetStarted={onGetStarted} />
      
      <div className="pt-24 md:pt-32 pb-20 md:pb-32 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Investor Vibe</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your investment style is as unique as you are. Select the archetype that resonates with your financial energy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {personaTypes.map((type, index) => (
              <PersonaCard key={type} type={type} />
            ))}
          </div>
        </div>
      </div>

      <ChatbotPlaceholder />
    </div>
  );
};

export default PersonaSelectionPage;
