import React, { useRef } from 'react';
import Types from 'prop-types';

import { Breakpoint } from '../common';
import useClientWidth from './hooks';

const SizeSwapper = ({ breakpoints, items, debouncingDelay }) => {
  const elRef = useRef();
  const [clientWidth] = useClientWidth({ elRef, debouncingDelay });

  return (
    <div className="tw-size-swapper" ref={elRef}>
      {items[breakpoints.filter((bp) => clientWidth >= bp).length]}
    </div>
  );
};

SizeSwapper.Breakpoint = Breakpoint;

SizeSwapper.propTypes = {
  /** Breakpoints at which elements will be swapped */
  breakpoints: Types.arrayOf(
    Types.oneOf([
      SizeSwapper.Breakpoint.EXTRA_SMALL,
      SizeSwapper.Breakpoint.SMALL,
      SizeSwapper.Breakpoint.MEDIUM,
      SizeSwapper.Breakpoint.LARGE,
      SizeSwapper.Breakpoint.EXTRA_LARGE,
    ]),
  ),
  /** Applied to window resize event, determine the frequency of the resize callback call */
  debouncingDelay: Types.number,
  /** List of items that will appear at different breakpoints in FIFO order */
  items: Types.arrayOf(Types.element).isRequired,
};

SizeSwapper.defaultProps = {
  breakpoints: [Breakpoint.MEDIUM],
  debouncingDelay: useClientWidth.DEBOUNCE_DELAY,
};

export default SizeSwapper;
