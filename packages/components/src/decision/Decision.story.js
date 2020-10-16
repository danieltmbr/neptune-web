import React from 'react';
import Decision from './Decision';
import Avatar from '../avatar';

export default {
  component: Decision,
  title: 'Decision',
};

export const basic = () => {
  return (
    <Decision
      type="NAVIGATION"
      presentation="LIST_BLOCK"
      options={[
        {
          media: {
            list: (
              <Avatar>
                <img
                  src="https://user-images.githubusercontent.com/16908937/96282975-5b58e280-0fd3-11eb-8947-713cb102b79d.jpg"
                  alt=""
                />
              </Avatar>
            ),
            block: (
              <Avatar>
                <img
                  src="https://user-images.githubusercontent.com/16908937/96282968-57c55b80-0fd3-11eb-9d15-8a37b55d6f2a.jpg"
                  alt=""
                />
              </Avatar>
            ),
          },
          title: 'translated messqge 1',
          content: 'translated message 1',
          onClick: () => console.log('clicked'),
        },
        {
          media: {
            list: (
              <Avatar>
                <img
                  src="https://user-images.githubusercontent.com/16908937/96282975-5b58e280-0fd3-11eb-8947-713cb102b79d.jpg"
                  alt=""
                />
              </Avatar>
            ),
            block: (
              <Avatar>
                <img
                  src="https://user-images.githubusercontent.com/16908937/96282968-57c55b80-0fd3-11eb-9d15-8a37b55d6f2a.jpg"
                  alt=""
                />
              </Avatar>
            ),
          },
          title: 'translated message 2',
          content: 'translated message 2',
          onClick: () => console.log('clicked'),
        },
      ]}
    />
  );
};
