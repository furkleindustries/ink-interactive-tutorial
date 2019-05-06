import {
  App,
} from './components/App';
import {
  default as React,
} from 'react';
import {
  render,
} from 'react-dom';
import {
  register,
  unregister,
} from './serviceWorker';

import './index.css';

(async () => {
  if (typeof window !== 'undefined') {
    window.inkjs = await import('./ink/runtime').default;
  }

  render(
    <App />,
    document.getElementById('root'),
  );

  // Learn more about service workers: https://bit.ly/CRA-PWA
  if (process.env.NODE_ENV === 'production') {
    register();
  } else {
    unregister();
  }
})();
