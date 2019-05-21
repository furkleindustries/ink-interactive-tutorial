import classnames from 'classnames';
import {
  NavBar,
} from '../NavBar';

import * as React from 'react';

import styles from './index.module.scss';

export const Header = () => (
  <header className={classnames(styles.header)}>
    <NavBar />
  </header>
);
