import { useState, useEffect, useRef } from 'react';

interface UseProgressiveImageProps {
  src: string;
  placeholder?: string;
}

export const useProgressiveImage = ({ src, placeholder }: UseProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder || '');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
    
    img.src = src;
    
    return () => {
      img.onload = null;
    };
  }, [src]);

  return {
    src: currentSrc,
    isLoaded,
    ref: imgRef
  };
};
