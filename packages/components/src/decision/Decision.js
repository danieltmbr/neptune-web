import React from 'react';
import Types from 'prop-types';
import SizeSwapper from '../sizeswapper';
import NavigationOption from '../navigationOption';
import Tile from '../tile';
/**
 * Decision docs.
 *
 * @param {type} [propname=''] - propsDescription.
 *
 * @usage '<Decision/>'
 * */

const Decision = ({ presentation, options, type }) => {
  let elements = null;
  switch (presentation) {
    case 'LIST_BLOCK':
    case 'LIST_BLOCK_SMALL':
      if (type === 'NAVIGATION') {
        const small = presentation === 'LIST_BLOCK_SMALL';
        elements = options.map(({ title, content, media: { list, block }, onClick }, key) => (
          <SizeSwapper
            key={`${title}${Math.random()}`}
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
                key={`${title}${Math.random()}`}
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
      break;
    // LIST
    default:
      elements = options.map(({ title, content, media: { list, block }, onClick }) => (
        <NavigationOption
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
      break;
  }
  return elements;
};

Decision.Presentation = ['LIST', 'LIST_BLOCK', 'LIST_BLOCK_SMALL'];

Decision.propTypes = {
  presentation: Types.oneOf(Decision.presentation),
  options: Types.arrayOf(
    Types.shape({
      media: Types.shape({
        list: Types.elementTypeOf(),
        block: Types.elementTypeOf(),
      }),
      title: Types.oneOf([Types.string]).isRequired,
      content: Types.oneOf([Types.string]).isRequired,
      onClick: Types.func.isRequired,
    }),
  ),
};
Decision.defaultProps = {
  presentation: 'LIST',
  type: 'NAVIGATION',
};

export default Decision;
