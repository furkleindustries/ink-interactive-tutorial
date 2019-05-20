import {
  NavBar,
} from '../NavBar';

import * as React from 'react';

import styles from './index.module.scss';

export const Header = () => (
  <header class={styles.header}>
    <NavBar />
  </header>
);
