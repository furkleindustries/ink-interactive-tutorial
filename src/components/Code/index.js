import classnames from 'classnames';

import * as React from 'react';

import styles from './index.module.scss';

export const Code = ({
  children,
  className,
  height,
  width,
  ...props
}) => (
  <div className={styles.codeWrapper}>
    <textarea
      {...props}
      className={classnames(styles.code, className)}
      height={height}
      readOnly={true}
      value={children}
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
    </textarea>
  </div>
);
