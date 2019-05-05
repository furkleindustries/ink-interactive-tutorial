import {
  default as React,
} from 'react';

import styles from './index.module.scss';

export const Code = ({
  children,
  ...props
}) => (
  <code
    className={styles.code}
    {...props}
  >
    {children}
  </code>
);
