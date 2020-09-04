import React from 'react';
import Button from './Button';

export default {
  component: Button,
  title: 'Button',
  argTypes: { onClick: { action: 'clicked' } },
};

export const Basic = (args) => <Button {...args}>A button</Button>;
