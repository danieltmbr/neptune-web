import React from 'react';
import { render, screen } from '@testing-library/react';

import Picker from '.';

describe(Picker, () => {
  const onClick = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('shows tiles and hides navigation options', async () => {
    const { container } = render(
      <div style={{ width: 1200 }}>
        <Picker
          items={[anItem(), anItem({ title: 'Hank Miller', key: 'HANK_MILLER' })]}
          onClick={onClick}
        />
      </div>,
    );

    await screen.findByText('Melipe Forales');

    expect(tileContainer(container)).toBeVisible();
    expect(navigationOptionContainer(container)).not.toBeVisible();
  });

  it("shows navigation options when parent element's width is less than 768 pixels", async () => {
    const { container } = render(
      <div style={{ width: 760 }}>
        <Picker
          items={[anItem(), anItem({ title: 'Hank Miller', key: 'HANK_MILLER' })]}
          onClick={onClick}
        />
      </div>,
    );

    await screen.findByText('Melipe Forales');

    expect(tileContainer(container)).not.toBeVisible();
    expect(navigationOptionContainer(container)).toBeVisible();
  });

  it.todo('onClick');

  const anItem = ({
    title = 'Melipe Forales',
    content = <p>Send your money straight to Melipe</p>,
    media = <img data-testid="normal-media" alt="illustration" />,
    smallMedia = <img data-testid="small-media" alt="illustration" />,
    key = 'MELIPE_FORALES',
  } = {}) => ({ title, content, media, smallMedia, key });
  const tileContainer = (container) => container.querySelector('.tw-picker__tile-container');
  const navigationOptionContainer = (container) =>
    container.querySelector('.tw-navigation-options-list');
});
