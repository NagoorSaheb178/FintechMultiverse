export type PersonaType = 'innovator' | 'traditionalist' | 'adventurer' | 'athlete' | 'artist';

export interface Persona {
  type: PersonaType;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  bgColor: string;
  textColor: string;
  gradientFrom: string;
  gradientTo: string;
  image: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}
