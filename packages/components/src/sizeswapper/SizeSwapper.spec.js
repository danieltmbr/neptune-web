import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import SizeSwapper from '.';

const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
const resetClientWidth = (width) => {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: width });
};
const breakpoints = [SizeSwapper.Breakpoint.SMALL, SizeSwapper.Breakpoint.MEDIUM];

describe('SizeSwapper', () => {
  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth);
  });

  it('switches elements according to breakpoints', () => {
    const { getByText, queryByText } = render(
      <SizeSwapper
        items={[<>element1</>, <>element2</>, <>element3</>]}
        breakpoints={breakpoints}
      />,
    );

    expect(getByText('element1')).toBeInTheDocument();
    expect(queryByText('element2')).not.toBeInTheDocument();
    expect(queryByText('element3')).not.toBeInTheDocument();

    resetClientWidth(breakpoints[0]);
    fireEvent(window, new Event('resize'));
    expect(getByText('element2')).toBeInTheDocument();
    expect(queryByText('element1')).not.toBeInTheDocument();
    expect(queryByText('element3')).not.toBeInTheDocument();

    resetClientWidth(breakpoints[1]);
    fireEvent(window, new Event('resize'));
    expect(getByText('element3')).toBeInTheDocument();
    expect(queryByText('element1')).not.toBeInTheDocument();
    expect(queryByText('element2')).not.toBeInTheDocument();

    resetClientWidth(breakpoints[0] - 1);
    fireEvent(window, new Event('resize'));
    expect(getByText('element1')).toBeInTheDocument();
    expect(queryByText('element2')).not.toBeInTheDocument();
    expect(queryByText('element3')).not.toBeInTheDocument();
  });
});
