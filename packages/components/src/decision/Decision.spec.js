import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Decision from '.';
import Avatar from '../avatar';

const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
const resetClientWidth = (width) => {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: width });
};

const props = {
  type: Decision.Type.NAVIGATION,
  presentation: Decision.Presentation.LIST_BLOCK,
  options: [
    {
      media: {
        list: <Avatar type="initials">HM</Avatar>,
        block: <img src="img.jpg" alt="alt" />,
      },
      title: 'title',
      description: 'description',
      onClick: jest.fn(),
    },
  ],
};

describe('Decision', () => {
  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth);
  });

  describe(`when presentation is ${Decision.Presentation.LIST_BLOCK}`, () => {
    let container;
    beforeEach(() => {
      ({ container } = render(<Decision {...props} />));
    });

    it('renders Navigation Option under first breakpoint', () => {
      expect(container).toMatchSnapshot();
    });
    it('renders Tile passed first breakpoint', () => {
      resetClientWidth(900);
      expect(container).toMatchSnapshot();
    });
  });

  describe(`when presentation is ${Decision.Presentation.LIST_BLOCK_SMALL}`, () => {
    let container;
    beforeEach(() => {
      ({ container } = render(
        <Decision {...props} presentation={Decision.Presentation.LIST_BLOCK_SMALL} />,
      ));
    });

    it('renders Navigation Option under first breakpoint', () => {
      expect(container).toMatchSnapshot();
    });
    it('renders Small Tile passed first breakpoint', () => {
      resetClientWidth(900);
      expect(container).toMatchSnapshot();
    });
  });

  describe(`when presentation is ${Decision.Presentation.LIST}`, () => {
    let container;
    beforeEach(() => {
      ({ container } = render(<Decision {...props} presentation={Decision.Presentation.LIST} />));
    });

    it('renders Navigation Option under first breakpoint', () => {
      expect(container).toMatchSnapshot();
    });
    it('renders Navigation Option passed first breakpoint', () => {
      resetClientWidth(900);
      expect(container).toMatchSnapshot();
    });
  });
});
