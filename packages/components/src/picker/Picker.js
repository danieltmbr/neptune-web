import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ElementQueries from 'css-element-queries/src/ElementQueries';

import { Size } from '../common';
import NavigationOption from '../navigationOption';
import NavigationOptionList from '../navigationOptionsList';
import Tile from '../tile';

import './Picker.css';

const { LARGE, SMALL } = Size;

const Picker = ({ className, items, onClick, size }) => {
  const ref = useRef(null);
  useEffect(() => {
    ElementQueries.listen();
    ElementQueries.init();
    return () => {
      if (ref.current) {
        ElementQueries.detach(ref.current);
      }
    };
  }, []);
  return (
    <div className={classNames('tw-picker', className)} ref={ref}>
      <div className="tw-picker__tile-container p-x-2">
        {items.map(({ title, content, media, key }) => (
          <Tile
            key={key}
            className="m-x-1"
            title={title}
            content={content}
            media={media}
            size={size === SMALL ? Tile.Size.SMALL : undefined}
            onClick={() => onClick(key)}
          />
        ))}
      </div>
      <NavigationOptionList>
        {items.map(({ title, content, media, smallMedia, key }) => (
          <NavigationOption
            key={key}
            onClick={() => onClick(key)}
            title={title}
            content={content}
            media={smallMedia || media}
            showMediaAtAllSizes
            showMediaCircle={false}
          />
        ))}
      </NavigationOptionList>
    </div>
  );
};

Picker.Size = { SMALL, LARGE };

Picker.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf([Picker.Size.LARGE, Picker.Size.SMALL]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
      media: PropTypes.node.isRequired,
      smallMedia: PropTypes.node,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

Picker.defaultProps = {
  className: null,
  size: Picker.Size.LARGE,
};

export default Picker;
