import React, { useRef } from 'react';
import Types from 'prop-types';

import { Breakpoint } from '../common';
import useElementWidth from './hooks';

const SizeSwapper = ({ items, breakpoints }) => {
  const elRef = useRef();
  const [clientWidth] = useElementWidth({ elRef });

  let elementVisible = 0;
  breakpoints.forEach((bp) => {
    if (clientWidth >= bp) {
      elementVisible += 1;
    }
  });

  return (
    <div className="tw-size-swapper" ref={elRef}>
      {items[elementVisible]}
    </div>
  );
};

SizeSwapper.Breakpoint = Breakpoint;

SizeSwapper.propTypes = {
  /** list of two items that will appear at different breakpoints in FIFO order */
  items: Types.arrayOf(Types.element).isRequired,
  /** breakpoints */
  breakpoints: Types.arrayOf(
    Types.oneOf([
      SizeSwapper.Breakpoint.EXTRA_SMALL,
      SizeSwapper.Breakpoint.SMALL,
      SizeSwapper.Breakpoint.MEDIUM,
      SizeSwapper.Breakpoint.LARGE,
      SizeSwapper.Breakpoint.EXTRA_LARGE,
    ]),
  ),
};

SizeSwapper.defaultProps = {
  breakpoints: [Breakpoint.MEDIUM],
};

export default SizeSwapper;
