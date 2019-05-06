import {
  default as classnames,
} from 'classnames';
import {
  default as React,
  createRef,
} from 'react';

import styles from './index.module.scss';

export class Inkifier extends React.PureComponent {
  ref = createRef();

  render = () => {
    const {
      className,
      id = `ink-tutorial-${Math.ceil(Math.random() * 1000000)}`,
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
    const { storyContent } = this.props;

    const iframeElem = this.ref.current;
    const doc = iframeElem.contentDocument;
    const docBody = doc.body;

    const inkifierScriptElem = doc.createElement('script');
    inkifierScriptElem.src = '/inkifier-script.js';
    docBody.appendChild(inkifierScriptElem);
  
    const runtimeScriptElem = doc.createElement('script');
    runtimeScriptElem.textContent =
      `var storyContent = ${JSON.stringify(storyContent)};`;

    docBody.appendChild(runtimeScriptElem);
  };
};
