import {
  default as React,
  createRef,
} from 'react';

import styles from './index.module.scss';

import script from './inkifier-script.txt';

export const Inkifier = ({
  id = `ink-tutorial-${Math.ceil(Math.random() * 100)}`,
  storyContent,
}) => {
  const Reffer = React.forwardRef((props, ref) => (
    <iframe
      class={styles.ink}
      ref={ref}
      title={`ink-tutorial-${id}`}
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
      `var storyContent = JSON.stringify(\`${storyContent}\`);` +
      `${script}\n` +
    `</script>\n`;
  docBody.appendChild(runtimeScriptElem);

  return iframeComponent;
};
