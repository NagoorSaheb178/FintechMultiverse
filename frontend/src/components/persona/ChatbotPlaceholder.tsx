import { FC, useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { personaData } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotPlaceholder: FC = () => {
  const { selectedPersona } = usePersona();
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState('');

  if (!selectedPersona) return null;
  
  const persona = personaData[selectedPersona];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed bottom-6 right-6 max-w-sm w-full rounded-xl bg-white/10 border border-white/20 glass-effect shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <div className={`p-4 bg-gradient-to-r ${persona.gradientFrom} ${persona.gradientTo} flex justify-between items-center`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Financial AI Assistant</h3>
                <p className="text-xs text-white/70">Powered by AI</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="text-white hover:text-white/70 p-1"
              onClick={() => setIsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto bg-dark/40">
            <motion.div 
              className="bg-white/10 p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg mb-4 max-w-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm">👋 Hi there! I'm your personalized financial assistant. I see you've selected the <span className="font-semibold">{persona.title}</span> profile.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg mb-4 max-w-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <p className="text-sm">I'm here to help you navigate your investment journey with a focus on {persona.tags.join(', ')}.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg mb-4 max-w-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1 }}
            >
              <p className="text-sm">What would you like to know about today?</p>
            </motion.div>
          </div>
          
          <div className="p-4 border-t border-white/10 bg-dark/60">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask about your investment options..."
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button className={`bg-primary hover:bg-primary/80 text-white p-2 rounded-lg`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatbotPlaceholder;
