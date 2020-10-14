import React from 'react';
import { action } from '@storybook/addon-actions';
import { FastFlag as FastFlagIcon } from '@transferwise/icons';
import SizeSwapper from './SizeSwapper';

import NavigationOption from '../navigationOption';
import Tile from '../tile';
import Avatar from '../avatar';

export default {
  component: SizeSwapper,
  title: 'SizeSwapper',
};

export const basic = () => {
  return (
    <>
      <SizeSwapper
        items={[
          <NavigationOption
            complex={false}
            id="navigation-option"
            name="navigation-option"
            href="#"
            title="A title"
            content="Some content"
            onClick={action('clicked')}
            media={<FastFlagIcon />}
            showMediaAtAllSizes
            showMediaCircle
            className="className"
          />,
          <Tile
            title="A title"
            content="Some content"
            media={
              <Avatar size="md" theme="light" type="initials" className="text-xs-center">
                HM
              </Avatar>
            }
            size="SMALL"
            onClick={action('clicked')}
          />,
        ]}
      />
      <SizeSwapper
        items={[
          <NavigationOption
            complex={false}
            id="navigation-option"
            name="navigation-option"
            href="#"
            title="A title"
            content="Some content"
            onClick={action('clicked')}
            media={<FastFlagIcon />}
            showMediaAtAllSizes
            showMediaCircle
            className="className"
          />,
          <Tile
            title="A title"
            content="Some content"
            media={
              <Avatar size="md" theme="light" type="initials" className="text-xs-center">
                HM
              </Avatar>
            }
            size="SMALL"
            onClick={action('clicked')}
          />,
        ]}
      />
    </>
  );
};
