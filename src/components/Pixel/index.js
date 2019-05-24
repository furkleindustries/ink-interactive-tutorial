import classnames from 'classnames';
import {
  oneByOneTransparentBase64,
} from './oneByOneTransparentBase64';

import * as React from 'react';

import styles from './index.module.scss';

export const Pixel = ({
  onLoad,
  src,
}) => (
  <img
    alt="This is invisible and contentless and is used for scripting or analytics purposes."
    className={classnames(styles.pixel)}
    height={0}
    onLoad={typeof onLoad === 'function' ? onLoad : undefined}
    src={src || oneByOneTransparentBase64}
    width={0}
  />
);
