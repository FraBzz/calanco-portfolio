import React from 'react';
import logoImage from './1000065143.png';

interface CalancoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'header';
  alt?: string;
}

const CalancoLogo: React.FC<CalancoLogoProps> = ({ 
  className = "", 
  size = 'md',
  alt = "Calanco Logo"
}) => {  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-10 w-10',
    xl: 'h-12 w-12',
    '2xl': 'h-16 w-16',
    '3xl': 'h-24 w-24',
    '4xl': 'h-32 w-32',
    header: 'h-10 w-10'
  };

  return (
    <img
      src={logoImage}
      alt={alt}
      className={`${sizeClasses[size]} object-contain object-center ${className}`}
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
};

export default CalancoLogo;



