import { useState, useLayoutEffect } from 'react';

const DEBOUNCE_DELAY = 10;
let timeout = false;

export const useElementWidth = ({ elRef, debouncingDelay = DEBOUNCE_DELAY }) => {
  const [clientWidth, setClientWidth] = useState(0);

  const getClientWidth = () => setClientWidth(elRef.current.clientWidth);

  useLayoutEffect(() => {
    // Display right element on load.
    getClientWidth();
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      // Only call the event handler after the event has stopped firing for a certain amount of time.
      timeout = setTimeout(getClientWidth, debouncingDelay);
    });

    return () => window.removeEventListener('resize', getClientWidth);
  }, []);

  return [clientWidth];
};
