import {
  createBrowserHistory,
} from 'history';
import {
  Router,
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
    <Router history={createBrowserHistory()}>
      <Suspense fallback={<div>Loading...</div>}>
        <Document />
      </Suspense>
    </Router>
  </div>
);
