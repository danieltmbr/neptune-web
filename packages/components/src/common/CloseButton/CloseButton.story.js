import React from 'react';

import { CloseButton } from './CloseButton';

export default {
  component: CloseButton,
  title: 'CloseButton',
};

export const basic = () => {
  return <CloseButton onClick={() => alert('here')} />;
};
