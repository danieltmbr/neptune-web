import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 5;

export const useClientWidth = ({ elRef, debouncingDelay = DEBOUNCE_DELAY }) => {
  const [clientWidth, setClientWidth] = useState(null);

  const updateClientWidth = () => {
    if (elRef && elRef.current) {
      setClientWidth(elRef.current.clientWidth);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', debounce(updateClientWidth, debouncingDelay));

    updateClientWidth();

    return () => window.removeEventListener('resize', updateClientWidth);
  }, []);

  return [clientWidth];
};

useClientWidth.DEBOUNCE_DELAY = DEBOUNCE_DELAY;
