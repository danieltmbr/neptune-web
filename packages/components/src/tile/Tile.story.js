import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import Tile from '.';
import Avatar from '../avatar';

export default {
  component: Tile,
  title: 'Tile',
};

export const basic = () => {
  const title = text('title', 'Hank Miller');
  const body = text('body', 'Click here to send money to Mr. Miller');
  const size = select('Size', Tile.Size, Tile.Size.LARGE);

  return (
    <Tile
      title={title}
      content={body}
      media={
        <Avatar size="md" theme="light" type="initials" className="text-xs-center">
          HM
        </Avatar>
      }
      size={size}
      onClick={() => alert('onClick')}
    />
  );
};
