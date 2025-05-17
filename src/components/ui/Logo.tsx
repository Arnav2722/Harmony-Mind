import React from 'react';
import { Music } from 'lucide-react';

interface LogoProps {
  size?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 24, color = 'currentColor' }) => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full">
      <Music size={size * 0.6} color="white" />
      <div className="absolute -inset-0.5 bg-gradient-to-br from-teal-400 to-indigo-600 opacity-30 rounded-full blur"></div>
    </div>
  );
};

export default Logo;