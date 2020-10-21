import React from 'react';
import Types from 'prop-types';
import SizeSwapper from '../sizeswapper';
import NavigationOption from '../navigationOption';
import Tile from '../tile';
import { elementOfType } from '../common/customProps';

const Decision = ({ presentation, options, type }) => {
  if (type === 'NAVIGATION') {
    if (presentation === 'LIST_BLOCK' || presentation === 'LIST_BLOCK_SMALL') {
      const small = presentation === 'LIST_BLOCK_SMALL';
      return options.map(({ title, content, media: { list, block }, onClick }, key) => (
        <SizeSwapper
          // eslint-disable-next-line react/no-array-index-key
          key={`${title}${key}`}
          items={[
            <NavigationOption
              key={`${title}${Math.random()}`}
              complex={false}
              href="#"
              title={title}
              content={content}
              onClick={onClick}
              media={list}
              showMediaAtAllSizes
              showMediaCircle
            />,
            <Tile
              title={title}
              content={content}
              media={block}
              size={small ? Tile.Size.SMALL : null}
              onClick={onClick}
            />,
          ]}
        />
      ));
    }
    // LIST
    return options.map(({ title, content, media: { list }, onClick }, key) => (
      <NavigationOption
        // eslint-disable-next-line react/no-array-index-key
        key={`${title}${key}`}
        complex={false}
        href="#"
        title={title}
        content={content}
        onClick={onClick}
        media={list}
        showMediaAtAllSizes
        showMediaCircle
      />
    ));
  }
  return null;
};

Decision.Presentation = {
  LIST: 'LIST',
  LIST_BLOCK: 'LIST_BLOCK',
  LIST_BLOCK_SMALL: 'LIST_BLOCK_SMALL',
};

Decision.propTypes = {
  presentation: Types.oneOf(Decision.presentation),
  options: Types.arrayOf(
    Types.shape({
      media: Types.shape({
        list: elementOfType(['Avatar']),
        block: elementOfType(['Avatar']),
      }),
      title: Types.string.isRequired,
      content: Types.string.isRequired,
      onClick: Types.func.isRequired,
    }),
  ),
};
Decision.defaultProps = {
  presentation: 'LIST',
  type: 'NAVIGATION',
};

export default Decision;
