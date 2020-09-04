import React from 'react';
import '@transferwise/neptune-css/dist/css/neptune.css';
import 'currency-flags/dist/currency-flags.min.css';
import '@transferwise/icons/dist/icons.min.css';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px',
  minHeight: '100vh',
  width: '100vw',
};

export const decorators = [
  (Story) => (
    <div style={style}>
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    </div>
  ),
];
