import {
  default as classnames,
} from 'classnames';
import {
  default as React,
} from 'react';

import styles from './index.module.scss';

export const Code = ({
  children,
  className,
  ...props
}) => (
  <div className={styles.codeWrapper}>
    <textarea
      {...props}
      className={classnames(styles.code, className)}
      readOnly={true}
      value={children}
    >
    </textarea>
  </div>
);
