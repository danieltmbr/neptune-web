import React, { useRef } from 'react';
import Types from 'prop-types';

import { Breakpoint } from '../common';
import useClientWidth from './hooks';

const SizeSwapper = ({ breakpoints, items, debouncingDelay }) => {
  const elRef = useRef();
  const [clientWidth] = useClientWidth({ elRef, debouncingDelay });

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
  /** Applied to window resize event, determine the frequency of the resize callback call. */
  debouncingDelay: Types.number,
  /** list of two items that will appear at different breakpoints in FIFO order */
  items: Types.arrayOf(Types.element).isRequired,
};

SizeSwapper.defaultProps = {
  breakpoints: [Breakpoint.MEDIUM],
  debouncingDelay: useClientWidth.DEBOUNCE_DELAY,
};

export default SizeSwapper;
