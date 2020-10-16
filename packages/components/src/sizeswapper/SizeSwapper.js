import React, { useEffect, useRef } from 'react';
import Types from 'prop-types';
import classNames from 'classnames';
import ElementQueries from 'css-element-queries/src/ElementQueries';

import './SizeSwapper.css';

const SizeSwapper = ({ items }) => {
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
    <div className={classNames('tw-size-swapper')} ref={ref}>
      <div className="tw-size-swapper__first_container">{items[0]}</div>
      <div className="tw-size-swapper__second_container">{items[1]}</div>
    </div>
  );
};

SizeSwapper.propTypes = {
  // items is a list of two or more items that will appear at different breakpoints in FIFO order .
  items: Types.arrayOf(Types.element).isRequired,
};

export default SizeSwapper;
