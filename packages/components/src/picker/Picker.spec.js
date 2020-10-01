import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';

import Picker from '.';

describe(Picker, () => {
  const onClick = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  // FIXME: find out how the CSS can be tested with ResizeSensor
  it.skip('shows tiles and hides navigation options', () => {
    const { container } = render(
      <div style={{ width: 1200 }}>
        <Picker
          items={[anItem(), anItem({ title: 'Hank Miller', key: 'HANK_MILLER' })]}
          onClick={onClick}
        />
      </div>,
    );

    expect(tileContainer(container)).toBeVisible();
    expect(navigationOptionsList(container)).not.toBeVisible();
  });

  // FIXME: find out how the CSS can be tested with ResizeSensor
  it.skip("shows navigation options when parent element's width is less than 768 pixels", async () => {
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
    expect(navigationOptionsList(container)).toBeVisible();
  });

  it('shows small media in navigation option if passed and normal media otherwise', () => {
    const { container } = render(
      <Picker
        items={[anItem(), anItem({ title: 'Hank Miller', key: 'HANK_MILLER', smallMedia: null })]}
        onClick={onClick}
      />,
    );

    const [firstItem, secondItem] = navigationOptionsList(container).children;

    expect(within(firstItem).getByTestId('small-media')).toBeInTheDocument();
    expect(within(firstItem).queryByTestId('normal-media')).not.toBeInTheDocument();

    expect(within(secondItem).getByTestId('normal-media')).toBeInTheDocument();
    expect(within(secondItem).queryByTestId('small-media')).not.toBeInTheDocument();
  });

  it('calls onClick with the item key', () => {
    const { container } = render(
      <Picker
        items={[anItem(), anItem({ title: 'Hank Miller', key: 'HANK_MILLER', smallMedia: null })]}
        onClick={onClick}
      />,
    );

    expect(onClick).not.toHaveBeenCalled();

    fireEvent.click(within(navigationOptionsList(container)).getByText('Melipe Forales'));

    expect(onClick).toHaveBeenCalledWith('MELIPE_FORALES');

    fireEvent.click(within(tileContainer(container)).getByText('Hank Miller'));

    expect(onClick).toHaveBeenCalledWith('HANK_MILLER');
  });

  const anItem = ({
    title = 'Melipe Forales',
    content = <p>Send your money straight to Melipe</p>,
    media = <img data-testid="normal-media" alt="illustration" />,
    smallMedia = <img data-testid="small-media" alt="illustration" />,
    key = 'MELIPE_FORALES',
  } = {}) => ({ title, content, media, smallMedia, key });
  const tileContainer = (container) => container.querySelector('.tw-picker__tile-container');
  const navigationOptionsList = (container) =>
    container.querySelector('.tw-navigation-options-list');
});
