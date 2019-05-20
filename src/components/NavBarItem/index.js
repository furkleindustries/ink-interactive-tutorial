import classnames from 'classnames';
import {
  Link,
} from 'react-router-dom';

import * as React from 'react';

import styles from './index.module.scss';

export const NavBarItem = ({
  children,
  href,
}) => (
  <div className={classnames(styles.navBarItem)}>
    {href ?
      <Link to={href}>{children}</Link> :
      children}
  </div>
);
