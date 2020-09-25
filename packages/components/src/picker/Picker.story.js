import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import Picker from '.';

export default {
  component: Picker,
  title: 'Picker',
};

export const basic = () => {
  const title = text('title', 'Send money');
  const content = <p>{text('body', 'Click here to be redirected to transferflow')}</p>;
  const size = select('Size', Picker.Size, Picker.Size.LARGE);
  const smallMedia = (
    <img
      src="https://transferwise.com/public-resources/assets/balances/open-balance/balance_type_everyday_small.svg"
      alt="illustration"
      width="100%"
    />
  );
  const media = (
    <img
      src="https://transferwise.com/public-resources/assets/bank-details/bank-details-flow/finish.svg"
      alt="illustration"
      width="100%"
    />
  );
  const items = [
    { title, content, media, smallMedia },
    { title, content, media, smallMedia },
  ];

  return <Picker items={items} size={size} />;
};
