import React, { StrictMode } from 'react';
import '@transferwise/neptune-css/dist/css/neptune.css';
import 'currency-flags/dist/currency-flags.min.css';
import '@transferwise/icons/dist/icons.min.css';

export const parameters = {
  layout: 'padded',
  panelPosition: 'right',
};

export const decorators = [
  (Story) => (
    <StrictMode>
      <Story />
    </StrictMode>
  ),
];
