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
              <Avatar size="md" theme="light" type="initials" className="text-xs-center">
                HM
              </Avatar>
            ),
            block: (
              <img
                src="https://transferwise.com/public-resources/assets/bank-details/bank-details-flow/finish.svg"
                alt=""
              />
            ),
          },
          title: 'Hank Miller',
          content: (
            <p>
              Click here to send money to Hank Miller. Money will be sent directly to Hank
              Miller&apos;s multi-currency account.
            </p>
          ),
          onClick: action('clicked'),
        },
        {
          media: {
            list: (
              <Avatar size="md" theme="light" type="initials" className="text-xs-center">
                HM
              </Avatar>
            ),
            block: (
              <img
                src="https://transferwise.com/public-resources/assets/bank-details/bank-details-flow/finish.svg"
                alt=""
              />
            ),
          },
          title: 'Hank Miller',
          content: (
            <p>
              Click here to send money to Hank Miller. Money will be sent directly to Hank
              Miller&apos;s multi-currency account.
            </p>
          ),
          onClick: action('clicked'),
        },
      ]}
    />
  );
};
