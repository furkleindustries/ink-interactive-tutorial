import {
  BrowserRouter as Link, Route, Router,
} from 'react-router-dom';
import {
  default as React,
  lazy,
  Suspense,
} from 'react';

import styles from './index.module.scss';

const Document = lazy(() => import('../Document'));

export const App = () => (
  <div className={styles.App}>
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Document />
      </Router>
    </Suspense>
  </div>
);
