import React from 'react';
import Types from 'prop-types';
import requiredIf from 'react-required-if';
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

const Decision = ({ options, presentation, type }) => {
  if (type === DecisionType.NAVIGATION) {
    const { LIST_BLOCK, LIST_BLOCK_SMALL } = DecisionPresentantion;
    if (presentation === LIST_BLOCK || LIST_BLOCK_SMALL) {
      const small = presentation === LIST_BLOCK_SMALL;
      return options.map(({ description, href, media: { block, list }, onClick, title }, key) => (
        <SizeSwapper
          // eslint-disable-next-line react/no-array-index-key
          key={key}
          items={[
            <NavigationOption
              complex={false}
              content={description}
              href={href}
              media={list}
              onClick={onClick}
              showMediaAtAllSizes
              showMediaCircle
              title={title}
            />,
            <Tile
              description={description}
              media={block}
              onClick={onClick}
              size={small ? Tile.Size.SMALL : null}
              title={title}
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
        content={description}
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
  /**  The options to be rendered. */
  options: Types.arrayOf(
    Types.shape({
      media: Types.shape({
        block: elementOfType(['Avatar', 'img']).isRequired,
        list: elementOfType(['Avatar', 'img']).isRequired,
      }),
      title: Types.oneOfType([elementOfType(['Message']), Types.string]).isRequired,
      description: Types.oneOfType([elementOfType(['Message']), Types.string]).isRequired,
      onClick: Types.func.isRequired,
      href: requiredIf(Types.string, (props) => props.type === Decision.Type.NAVIGATION),
    }),
  ).isRequired,
  /**  Handles the display mode of the component. */
  presentation: Types.oneOf([
    Decision.Presentation.LIST,
    Decision.Presentation.LIST_BLOCK,
    Decision.Presentation.LIST_BLOCK_SMALL,
  ]),

  /** The element type to be rendered in the list. */
  type: Types.oneOf([Decision.Type.NAVIGATION]),
};

Decision.defaultProps = {
  presentation: Decision.Presentation.LIST,
  type: Decision.Type.NAVIGATION,
};

export default Decision;
