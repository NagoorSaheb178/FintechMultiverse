import { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onGetStarted: () => void;
}

const Navbar: FC<NavbarProps> = ({ onGetStarted }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 glass-effect border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <span className="text-xl font-bold">FinVerse</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/">
              <a className="hover:text-secondary transition-colors">Home</a>
            </Link>
            <a href="#" className="hover:text-secondary transition-colors">About</a>
            <a href="#" className="hover:text-secondary transition-colors">Features</a>
            <a href="#" className="hover:text-secondary transition-colors">Contact</a>
          </div>
          
          <div>
            <Button 
              onClick={onGetStarted}
              className="py-2 px-5 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
