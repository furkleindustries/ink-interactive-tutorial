import {
  default as React,
  lazy,
  Suspense,
} from 'react';

import './App.css';

const Content = lazy(() => import('./Content.mdx'));

export const App = () => (
  <div class="App">
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
  </div>
);
