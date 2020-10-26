import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Decision from '.';
import Avatar from '../avatar';

describe('Decision', () => {
  const props = {
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
    presentation: Decision.Presentation.LIST_BLOCK,
    type: Decision.Type.NAVIGATION,
  };

  const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
  const resetClientWidth = (width) => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      value: width,
    });
  };

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth);
  });

  let container;
  describe(`when presentation is ${Decision.Presentation.LIST_BLOCK}`, () => {
    beforeEach(() => {
      resetClientWidth(500);
      ({ container } = render(<Decision {...props} />));
    });

    it('renders Navigation Option before first breakpoint', () => {
      expect(getNavigationOption()).toBeInTheDocument();
    });

    it('renders Tile after first breakpoint', async () => {
      resetClientWidth(900);
      fireEvent(window, new Event('resize'));
      await waitFor(() => {
        expect(getTile()).toBeInTheDocument();
        expect(getTile()).toHaveClass('tw-tile--large');
      });
    });
  });

  describe(`when presentation is ${Decision.Presentation.LIST_BLOCK_SMALL}`, () => {
    beforeEach(() => {
      resetClientWidth(500);
      ({ container } = render(
        <Decision {...props} presentation={Decision.Presentation.LIST_BLOCK_SMALL} />,
      ));
    });

    it('renders Navigation Option before first breakpoint', () => {
      expect(getNavigationOption()).toBeInTheDocument();
    });

    it('renders Small Tile after first breakpoint', async () => {
      resetClientWidth(900);
      fireEvent(window, new Event('resize'));
      await waitFor(() => {
        expect(getTile()).toBeInTheDocument();
        expect(getTile()).toHaveClass('tw-tile--small');
      });
    });
  });

  describe(`when presentation is ${Decision.Presentation.LIST}`, () => {
    beforeEach(() => {
      resetClientWidth(500);
      ({ container } = render(<Decision {...props} presentation={Decision.Presentation.LIST} />));
    });

    it('renders Navigation Option under first breakpoint', () => {
      expect(getNavigationOption()).toBeInTheDocument();
    });

    it('renders Navigation Option after first breakpoint', async () => {
      resetClientWidth(900);
      fireEvent(window, new Event('resize'));
      await waitFor(() => {
        expect(getNavigationOption()).toBeInTheDocument();
      });
    });
  });

  const getNavigationOption = () => container.querySelector('button.tw-navigation-option');
  const getTile = () => container.querySelector('.tw-tile');
});
