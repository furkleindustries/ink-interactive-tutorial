import classnames from 'classnames';
import {
  Link,
} from '../Link';

import * as React from 'react';

import styles from './index.module.scss';

export const NavBarItem = ({
  children,
  href,
}) => (
  <div className={classnames(styles.navBarItem)}>
    {href ?
      <Link
        className={styles.link}
        to={href}
      >{children}</Link> :
      children}
  </div>
);
