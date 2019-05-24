import classnames from 'classnames';
import {
  createRef,
} from 'react';

import * as React from 'react';

import styles from './index.module.scss';

export class Inkifier extends React.PureComponent {
  ref = createRef();

  render = () => {
    const {
      className,
      id = `ink-tutorial-${Math.ceil(Math.random() * 1000000)}`,
      inkifierScriptDir,
      width = 299,
      height = 300,
      storyContent,
      ...props
    } = this.props;

    const Reffer = React.forwardRef((unused, ref) => (
      <iframe
        {...props}
        className={classnames(styles.inkifier, className)}
        ref={ref}
        title={id}
        width={width}
        height={height}
      ></iframe>
    ));

    return <Reffer ref={this.ref} />;
  };

  componentDidMount = () => {
    const {
      inkifierScriptDir = '..',
      output,
      storyContent,
    } = this.props;

    const iframeElem = this.ref.current;
    const doc = iframeElem.contentDocument;
    const docBody = doc.body;

    const inkifierScriptElem = doc.createElement('script');
    inkifierScriptElem.src = `${inkifierScriptDir}/inkifier-script.js`;
    docBody.appendChild(inkifierScriptElem);

    const runtimeScriptElem = doc.createElement('script');
    runtimeScriptElem.textContent =
      `var storyContent = ${JSON.stringify(storyContent)};`;

    docBody.appendChild(runtimeScriptElem);

    if (output) {
      const lines = output
        .split('\n')
        .map((aa) => aa.trim())
        .filter(Boolean);

      if (lines.length) {
        const outputContainer = doc.createElement('ul');
        for (const line of lines) {
          const lineElem = doc.createElement('li');
          const lineElemCode = doc.createElement('code');
          lineElemCode.textContent = line;
          lineElem.appendChild(lineElemCode);
          outputContainer.appendChild(lineElem);
        }

        docBody.appendChild(outputContainer);
      }
    }
  };
}
