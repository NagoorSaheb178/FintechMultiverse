import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="relative pt-24 md:pt-32 pb-20 md:pb-32 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-60 -left-20 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto relative">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Welcome to the<br />
              <span className="gradient-text">Financial Multiverse</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-md">
              Explore investment personalities that match your vibe and navigate your financial journey with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onGetStarted}
                className="py-3 px-8 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                Find Your Investor Vibe
              </Button>
              <Button className="py-3 px-8 bg-white/10 border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all">
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-red-500"></div>
              </div>
              <span className="text-sm text-gray-300">Joined by <span className="text-secondary font-semibold">10,000+</span> Gen Z investors</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6"></div>
              <div className="relative z-10 rounded-3xl shadow-2xl shadow-primary/20 max-w-md md:max-w-lg h-64 md:h-80 bg-gradient-to-r from-primary/30 to-secondary/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
