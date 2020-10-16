import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ElementQueries from 'css-element-queries/src/ElementQueries';
import SizeSwapper from '.';

describe('SizeSwapper', () => {
  it('renders', () => {
    const { container } = render(
      <SizeSwapper items={[<div className="element1" />, <div className="element2" />]} />,
    );
    expect(container).toMatchSnapshot();
    act(() => {
      // Change the viewport to 500px.
      window.innerWidth = 500;
      window.innerHeight = 500;
    });
    fireEvent(window, new Event('resize'));

    expect(
      render(<SizeSwapper items={[<div className="element1" />, <div className="element2" />]} />),
    ).toMatchSnapshot();
  });
});
