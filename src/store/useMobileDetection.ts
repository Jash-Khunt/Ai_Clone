import { useEffect, useState } from 'react';
import { theme } from '../styles/theme';

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobileBreakpoint = parseInt(theme.BREAKPOINTS.tablet);
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
};

export default useMobileDetection;