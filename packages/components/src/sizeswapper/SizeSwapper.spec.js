import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';

import SizeSwapper from '.';

describe('SizeSwapper', () => {
  const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
  const resetClientWidth = (width) => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      value: width,
    });
  };
  const breakpoints = [SizeSwapper.Breakpoint.SMALL, SizeSwapper.Breakpoint.MEDIUM];

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth);
  });

  it('switches elements according to breakpoints', async () => {
    const { getByText, queryByText } = render(
      <SizeSwapper
        breakpoints={breakpoints}
        items={[<>element1</>, <>element2</>, <>element3</>]}
      />,
    );

    expect(getByText('element1')).toBeInTheDocument();
    expect(queryByText('element2')).not.toBeInTheDocument();
    expect(queryByText('element3')).not.toBeInTheDocument();

    resetClientWidth(breakpoints[0]);
    fireEvent(window, new Event('resize'));
    await waitFor(() => {
      expect(getByText('element2')).toBeInTheDocument();
      expect(queryByText('element1')).not.toBeInTheDocument();
      expect(queryByText('element3')).not.toBeInTheDocument();
    });

    resetClientWidth(breakpoints[1]);
    fireEvent(window, new Event('resize'));
    await waitFor(() => {
      expect(getByText('element3')).toBeInTheDocument();
      expect(queryByText('element1')).not.toBeInTheDocument();
      expect(queryByText('element2')).not.toBeInTheDocument();
    });

    resetClientWidth(breakpoints[0] - 1);
    fireEvent(window, new Event('resize'));
    await waitFor(() => {
      expect(getByText('element1')).toBeInTheDocument();
      expect(queryByText('element2')).not.toBeInTheDocument();
      expect(queryByText('element3')).not.toBeInTheDocument();
    });
  });
});
