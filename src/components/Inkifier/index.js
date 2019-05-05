import {
  default as React,
  createRef,
  lazy,
  Suspense,
} from 'react';

import styles from './index.module.scss';

const script = require('fs-extra').readFileSync('./script.js');

export const Inkifier = ({ storyContent }) => {
  const Content = lazy(() => new Promise((resolve, reject) => {
    const Reffer = React.forwardRef((props, ref) => (
      <iframe
        class={styles.ink}
        ref={ref}
      ></iframe>
    ));

    const ref = createRef();
    const iframeComponent = <Reffer ref={ref} />;

    const iframeElem = ref.current;
    const doc = iframeElem.documentElement;
    const docBody = doc.body;

    const inkJsScript = `<script src="./ink.js"></script>`;
    docBody.appendChild(inkJsScript);

    const runtimeScriptElem = doc.createElement('script');
    runtimeScriptElem.textContent =
      `<script class="runtimeLoop">\n` +
        `var storyContent = JSON.stringify(\`${storyContent}\`);`
        `${script}\n` +
      `</script>\n`;
    docBody.appendChild(runtimeScriptElem);

    return iframeComponent;
  }));

  return (
    <Suspense fallback={<div>Ink loading...</div>}>
      <Content />
    </Suspense>
  );
};
