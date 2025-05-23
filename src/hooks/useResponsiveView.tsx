import { useState, useEffect } from 'react';

function useResponsiveView() {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia('(max-width: 768px)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener('change', updateIsMobile);
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  return isMobile;
}

export default useResponsiveView;