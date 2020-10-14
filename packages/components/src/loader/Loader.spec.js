import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Loader from '.';
import NeptuneProvider from '../neptuneProvider';

describe('Loader', () => {
  afterEach(cleanup);

  function renderLoader(props) {
    return render(
      <NeptuneProvider locale="fr">
        <Loader {...props} />
      </NeptuneProvider>,
    );
  }

  it('tests default state', () => {
    const { container } = renderLoader();
    expect(container.querySelectorAll('div.tw-loader--xl')).toHaveLength(1);
    expect(container.querySelector('div[data-testid]')).toBe(null);
  });

  it('has data-testid prop', () => {
    const dataTestId = 'test-loader';
    const { getByTestId } = renderLoader({ 'data-testid': dataTestId });
    expect(getByTestId(dataTestId)).not.toBe(null);
  });

  it('shows a small loader if that property is set', () => {
    const { container } = renderLoader({ small: true });
    expect(container.querySelectorAll('div.tw-loader--xs')).toHaveLength(1);
  });
});
