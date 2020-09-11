import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ElementQueries from 'css-element-queries/src/ElementQueries';

import NavigationOption from '../navigationOption';
import NavigationOptionList from '../navigationOptionsList';
import Tile from '../tile';

import './Picker.css';

const Picker = ({ className, items, onClick, small }) => {
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
            size={small ? Tile.Size.SMALL : undefined}
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

Picker.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  small: PropTypes.bool,
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
  small: false,
};

export default Picker;
