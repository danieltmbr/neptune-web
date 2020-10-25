import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import KeyCodes from '../common/keyCodes';

import Tile from '.';

describe(Tile, () => {
  const onClick = jest.fn();
  const defaultProps = {
    title: 'Receive money',
    description: <span>Receive money from friends and familty like a local.</span>,
    media: <svg data-testid="illustration" />,
    onClick: () => onClick(),
  };

  beforeEach(() => jest.clearAllMocks());

  it('matches snapshot when regular size', () => {
    const { asFragment } = render(<Tile {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when small size', () => {
    const { asFragment } = render(<Tile size={Tile.Size.SMALL} {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onClick when anchor is clicked', async () => {
    render(<Tile {...defaultProps} />);

    expect(onClick).not.toHaveBeenCalled();

    const title = await screen.findByText('Receive money');

    expect(onClick).not.toHaveBeenCalled();

    fireEvent.click(title);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when space or enter keys are pressed', async () => {
    render(<Tile {...defaultProps} />);

    expect(onClick).not.toHaveBeenCalled();

    const title = await screen.findByText('Receive money');

    fireEvent.keyDown(title, { key: '33', keyCode: KeyCodes.ENTER });

    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(title, { key: '32', keyCode: KeyCodes.SPACE });

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
