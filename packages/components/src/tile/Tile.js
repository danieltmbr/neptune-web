import React from 'react';
import Types from 'prop-types';
import classNames from 'classnames';

import { Size } from '../common';
import KeyCodes from '../common/keyCodes';

import './Tile.css';

export const Tile = ({ className, title, description, media, size, onClick }) => {
  return (
    <div
      className={classNames('tw-tile', 'd-flex', 'flex-column', 'text-xs-center', className, {
        'tw-tile--small p-a-2': size === Tile.Size.SMALL,
        'tw-tile--large p-y-5 p-x-4': size !== Tile.Size.SMALL,
      })}
    >
      <div className="tw-tile__media m-x-auto">{media}</div>
      {/* using anchor as a button */}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className="tw-tile__link text-no-decoration "
        onClick={onClick}
        tabIndex="0"
        role="button"
        onKeyDown={(e) => {
          if (
            e.keyCode === KeyCodes.ENTER ||
            e.keyCode === KeyCodes.SPACE ||
            e.code === 32 ||
            e.code === 32
          ) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <span
          className={classNames({
            h5: size === Tile.Size.SMALL,
            h4: size !== Tile.Size.SMALL,
          })}
        >
          {title}
        </span>
      </a>
      <div className="tw-tile__description">{description}</div>
    </div>
  );
};

Tile.Size = Size;

Tile.propTypes = {
  title: Types.node.isRequired,
  description: Types.node,
  media: Types.node,
  onClick: Types.func.isRequired,
  size: Types.oneOf([Tile.Size.LARGE, Tile.Size.SMALL]),
  className: Types.string,
};

Tile.defaultProps = {
  media: null,
  description: null,
  className: null,
  size: Tile.Size.LARGE,
};

export default Tile;
