import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Tile from '.';
import Avatar from '../avatar';

export default {
  component: Tile,
  title: 'Tile',
};

export const basic = () => {
  const description = text('description', 'Click here to send money to Mr. Miller');
  const size = select('Size', Tile.Size, Tile.Size.LARGE);
  const title = text('title', 'Hank Miller');

  return (
    <Tile
      description={description}
      media={
        <Avatar size="md" theme="light" type="initials" className="text-xs-center">
          HM
        </Avatar>
      }
      onClick={() => action('onClick')}
      size={size}
      title={title}
    />
  );
};
