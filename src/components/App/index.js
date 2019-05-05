import {
  default as React,
  lazy,
  Suspense,
} from 'react';

import styles from './index.module.scss';

const Content = lazy(() => import('../Document'));

export const App = () => (
  <div className={styles.App}>
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
  </div>
);
