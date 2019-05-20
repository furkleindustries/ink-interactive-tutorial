import classnames from 'classnames';
import {
  NavBarItem,
} from '../NavBarItem';

import * as React from 'react';

import styles from './index.module.scss';

export const NavBar = () => (
  <nav className={classnames(styles.navBar)}>
    <ul className={classnames(styles.navBarList)}>
      <li className={classnames(styles.navBarListItem)}>
        <NavBarItem href="/home">
          Home
        </NavBarItem>
      </li>

      <li className={classnames(styles.navBarListItem)}>
        <NavBarItem href="/table-of-contents">
          Table of Contents
        </NavBarItem>
      </li>

      <li className={classnames(styles.navBarListItem)}>
        <NavBarItem href="/search">
          Search
        </NavBarItem>
      </li>

      <li className={classnames(styles.navBarListItem)}>
        <NavBarItem href="/example-list">
          Example List
        </NavBarItem>
      </li>

      <li className={classnames(styles.navBarListItem)}>
        <NavBarItem href="/repl">
          REPL
        </NavBarItem>
      </li>
    </ul>
  </nav>
);
