import classnames from 'classnames';
import {
  Link as ReactRouterLink,
} from 'react-router-dom';

import * as React from 'react';

import styles from './index.module.scss';

export const Link = ({
  children,
  className,
  props,
  to,
}) => (
  <ReactRouterLink
    {...props}
    className={classnames(styles.link, className)}
    to={`${process.env.PUBLIC_URL || '.'}${to ? `/${to}` : ''}`}
  >{
    children
  }</ReactRouterLink>
);
