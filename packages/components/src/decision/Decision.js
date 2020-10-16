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
  switch (presentation) {
    case 'LIST_BLOCK':
    case 'LIST_BLOCK_SMALL':
      if (type === 'NAVIGATION') {
        return options.map(({ title, content, media: { list, block }, onClick }) => (
          <SizeSwapper
            items={[
              <NavigationOption
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
                title="title"
                content={content}
                media={block}
                size={presentation === 'LIST_BLOCK_SMALL' ? 'SMALL' : null}
                onClick={onClick}
              />,
            ]}
          />
        ));
      }
      break;
    default:
      break;
  }
};

Decision.propTypes = {
  presentation: Types.oneOf(['LIST', 'LIST_BLOCK', 'LIST_BLOCK_SMALL']),
  options: Types.arrayOf(
    Types.shape({
      media: Types.shape({
        list: Types.oneOf(['<Image>', '<Avatar>']),
        block: Types.oneOf(['<Image>', '<Avatar>']),
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
