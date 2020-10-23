import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 10;

export const useElementWidth = ({ elRef, debouncingDelay = DEBOUNCE_DELAY }) => {
  const [clientWidth, setClientWidth] = useState(0);

  const getClientWidth = () => {
    setClientWidth(elRef.current.clientWidth);
  };

  useEffect(() => {
    // Display right element on load.
    getClientWidth();
    // Only call the event handler after the event has stopped firing for a certain amount of time.
    window.addEventListener('resize', debounce(getClientWidth, debouncingDelay));

    return () => window.removeEventListener('resize', getClientWidth);
  }, []);

  return [clientWidth];
};
