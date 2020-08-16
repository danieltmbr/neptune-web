import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import Picker from '.';

export default {
  component: Picker,
  title: 'Picker',
};

export const basic = () => {
  const title = text('title', 'Send money');
  const content = <p>{text('body', 'Click here to be redirected to transferflow.')}</p>;
  const isSmall = select('Small', { true: true, false: false }, false);
  const media = (
    <img
      src="https://transferwise.com/public-resources/assets/bank-details/bank-details-flow/finish.svg"
      alt="illustration"
      width="100%"
    />
  );
  const items = [
    { title, content, media },
    { title, content, media },
  ];

  return <Picker items={items} small={isSmall} />;
};
