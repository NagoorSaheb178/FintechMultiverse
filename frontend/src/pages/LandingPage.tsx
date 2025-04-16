import { FC } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-dark text-light">
      <Navbar onGetStarted={onGetStarted} />
      <HeroSection onGetStarted={onGetStarted} />
      <FeaturesSection />
    </div>
  );
};

export default LandingPage;
