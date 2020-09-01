import React from 'react';
import Types from 'prop-types';
import classNames from 'classnames';

import { Size } from '../common';
import KeyCodes from '../common/keyCodes';

import './Tile.css';

export const Tile = ({ className, title, content, media, size, onClick }) => {
  return (
    <div
      className={classNames('tw-tile', className, {
        'tw-tile--small p-a-2': size === Tile.Size.SMALL,
        'tw-tile--large p-x-5 p-y-4': size !== Tile.Size.SMALL,
      })}
    >
      <div className="m-y-2 m-x-auto">{media}</div>
      {/* using anchor as a button */}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className="tw-tile__link"
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
      <div className="tw-tile__content">{content}</div>
    </div>
  );
};

Tile.Size = Size;

Tile.propTypes = {
  title: Types.node.isRequired,
  content: Types.node,
  media: Types.node,
  onClick: Types.func.isRequired,
  size: Types.oneOf([Tile.Size.LARGE, Tile.Size.SMALL]),
  className: Types.string,
};

Tile.defaultProps = {
  media: null,
  content: null,
  className: null,
  size: Tile.Size.LARGE,
};

export default Tile;
