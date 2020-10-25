import React from 'react';
import Types from 'prop-types';
import SizeSwapper from '../sizeswapper';
import NavigationOption from '../navigationOption';
import Tile from '../tile';
import { elementOfType } from '../common/customProps';

const DecisionType = { NAVIGATION: 'NAVIGATION' };
const DecisionPresentantion = {
  LIST: 'LIST',
  LIST_BLOCK: 'LIST_BLOCK',
  LIST_BLOCK_SMALL: 'LIST_BLOCK_SMALL',
};

const Decision = ({ presentation, options, type }) => {
  if (type === DecisionType.NAVIGATION) {
    const { LIST_BLOCK, LIST_BLOCK_SMALL } = DecisionPresentantion;
    if (presentation === LIST_BLOCK || LIST_BLOCK_SMALL) {
      const small = presentation === LIST_BLOCK_SMALL;
      return options.map(({ title, description, media: { list, block }, onClick }, key) => (
        <SizeSwapper
          // eslint-disable-next-line react/no-array-index-key
          key={key}
          items={[
            <NavigationOption
              complex={false}
              href="#"
              title={title}
              description={description}
              onClick={onClick}
              media={list}
              showMediaAtAllSizes
              showMediaCircle
            />,
            <Tile
              title={title}
              description={description}
              media={block}
              size={small ? Tile.Size.SMALL : null}
              onClick={onClick}
            />,
          ]}
        />
      ));
    }
    // LIST
    return options.map(({ title, description, media: { list }, onClick }, key) => (
      <NavigationOption
        // eslint-disable-next-line react/no-array-index-key
        key={key}
        complex={false}
        href="#"
        title={title}
        description={description}
        onClick={onClick}
        media={list}
        showMediaAtAllSizes
        showMediaCircle
      />
    ));
  }
  return <></>;
};

Decision.Presentation = DecisionPresentantion;
Decision.Type = DecisionType;

Decision.propTypes = {
  /**  Handles the display mode of the component. */
  presentation: Types.oneOf([
    Decision.Presentation.LIST,
    Decision.Presentation.LIST_BLOCK,
    Decision.Presentation.LIST_BLOCK_SMALL,
  ]),
  /**  The options to be rendered. */
  options: Types.arrayOf(
    Types.shape({
      media: Types.shape({
        list: elementOfType(['Avatar', 'img']),
        block: elementOfType(['Avatar', 'img']),
      }),
      title: Types.string.isRequired,
      description: Types.node.isRequired,
      onClick: Types.func.isRequired,
    }),
  ).isRequired,
  /** The element type to be rendered. */
  type: Types.oneOf([Decision.Type.NAVIGATION]),
};

Decision.defaultProps = {
  presentation: Decision.Presentation.LIST,
  type: Decision.Type.NAVIGATION,
};

export default Decision;
