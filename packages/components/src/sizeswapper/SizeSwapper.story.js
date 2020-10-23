import React from 'react';

import SizeSwapper from './SizeSwapper';

export default {
  component: SizeSwapper,
  title: 'SizeSwapper',
};

export const basic = () => {
  const breakpoints = [
    SizeSwapper.Breakpoint.EXTRA_SMALL,
    SizeSwapper.Breakpoint.SMALL,
    SizeSwapper.Breakpoint.MEDIUM,
  ];
  const items = [0, ...breakpoints].map((bp) => <div>Element show from {bp}px</div>);

  return (
    <>
      <SizeSwapper items={items} breakpoints={breakpoints} />
      <SizeSwapper items={items} breakpoints={breakpoints} />
    </>
  );
};
