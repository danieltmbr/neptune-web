import React from 'react';
import { select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Decision from './Decision';
import Avatar from '../avatar';

export default {
  component: Decision,
  title: 'Decision',
};

export const basic = () => {
  const presentation = select('presentation', Decision.Presentation, 'LIST_BLOCK');
  return (
    <Decision
      type="NAVIGATION"
      presentation={presentation}
      options={[
        {
          media: {
            list: (
              <Avatar>
                <img
                  src="https://user-images.githubusercontent.com/16908937/96285661-26e72580-0fd7-11eb-996a-3ff23efe97e7.jpg"
                  alt=""
                />
              </Avatar>
            ),
            block: (
              <img
                src="https://user-images.githubusercontent.com/16908937/96285661-26e72580-0fd7-11eb-996a-3ff23efe97e7.jpg"
                alt=""
              />
            ),
          },
          title: 'Cat jumps and falls',
          content:
            'Cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter',
          onClick: action('clicked'),
        },
        {
          media: {
            list: (
              <Avatar>
                <img
                  src="https://user-images.githubusercontent.com/16908937/96286355-28fdb400-0fd8-11eb-9b5a-0b72f546667a.jpg"
                  alt=""
                />
              </Avatar>
            ),
            block: (
              <img
                src="https://user-images.githubusercontent.com/16908937/96286355-28fdb400-0fd8-11eb-9b5a-0b72f546667a.jpg"
                alt=""
              />
            ),
          },
          title: 'Cat purrs and wakes',
          content:
            'Cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter',
          onClick: action('clicked'),
        },
      ]}
    />
  );
};
