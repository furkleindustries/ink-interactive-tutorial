import LazyLoad from 'react-lazyload';

import * as React from 'react';

export const Lazy = ({
  children,
  ...props,
}) => (
  <LazyLoad {...props}>
    {children}
  </LazyLoad>
);
