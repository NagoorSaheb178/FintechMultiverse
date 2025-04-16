import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const personaData = {
  innovator: {
    type: 'innovator',
    title: 'Innovator',
    description: 'You thrive on cutting-edge technology and disruptive businesses. Early adoption is your middle name.',
    tags: ['Tech Startups', 'AI & Blockchain', 'Growth Focus'],
    icon: 'M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z',
    bgColor: 'bg-primary/20',
    textColor: 'text-primary',
    gradientFrom: 'from-primary',
    gradientTo: 'to-secondary',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
  },
  traditionalist: {
    type: 'traditionalist',
    title: 'Traditionalist',
    description: 'You value stability, proven methods, and long-term growth with companies that have stood the test of time.',
    tags: ['Blue Chips', 'Dividend Stocks', 'Low Risk'],
    icon: 'M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.5.87L10 15.69l-4.5 2.18A1 1 0 014 17V4z',
    bgColor: 'bg-accent/20',
    textColor: 'text-accent',
    gradientFrom: 'from-accent',
    gradientTo: 'to-primary',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
  },
  adventurer: {
    type: 'adventurer',
    title: 'Adventurer',
    description: 'You\'re willing to take calculated risks and explore emerging markets for potentially higher returns.',
    tags: ['Crypto', 'Global Markets', 'Medium Risk'],
    icon: 'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z',
    bgColor: 'bg-secondary/20',
    textColor: 'text-secondary',
    gradientFrom: 'from-secondary',
    gradientTo: 'to-primary',
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
  },
  athlete: {
    type: 'athlete',
    title: 'Athlete',
    description: 'You\'re disciplined, competitive, and not afraid to pivot strategies quickly based on performance.',
    tags: ['Sports Tech', 'Performance Brands', 'Agile Trading'],
    icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z',
    bgColor: 'bg-primary/20',
    textColor: 'text-primary',
    gradientFrom: 'from-primary',
    gradientTo: 'to-secondary',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
  },
  artist: {
    type: 'artist',
    title: 'Artist',
    description: 'You invest with creativity and intuition, looking for companies that value innovation and artistic vision.',
    tags: ['Creative Tech', 'NFTs & Digital Art', 'Entertainment'],
    icon: 'M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z',
    bgColor: 'bg-accent/20',
    textColor: 'text-accent',
    gradientFrom: 'from-accent',
    gradientTo: 'to-primary',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
  }
};

// Icons as path data for features
const CHART_ICON = 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6';
const SETTINGS_ICON = 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4';
const COMMUNITY_ICON = 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z';

export const features = [
  {
    iconPath: CHART_ICON,
    title: 'Personality-Driven Investing',
    description: 'Investment strategies tailored to your unique personality and financial goals.'
  },
  {
    iconPath: SETTINGS_ICON,
    title: 'AI-Powered Assistant',
    description: 'Get personalized financial guidance from our advanced AI that speaks your language.'
  },
  {
    iconPath: COMMUNITY_ICON,
    title: 'Community Insights',
    description: 'Learn from peers and veterans in the financial world with our community platform.'
  }
];
