import classnames from 'classnames';
import {
  Code,
} from '../Code';
import {
  Inkifier,
} from '../Inkifier';
import {
  Lazy,
} from '../Lazy';
import {
  Pixel,
} from '../Pixel';

import * as React from 'react';

import styles from './index.module.scss';

export class Example extends React.PureComponent {
  state = {
    loaded: false,
    output: '',
    storyContent: null,
    text: '',
  };

  debounce = 500;
  offset = 200;
  widgetHeight = 350;

  render = () => (
    <Lazy
      debounce={this.debounce}
      height={this.widgetHeight}
      offset={this.offset}
    >
      <Pixel onLoad={this.importExample} />

      <div className={classnames(styles.example)}>
        {this.state.loaded ?
          <div className={styles.loaded}>
            <Code>{this.state.text}</Code>
            <Inkifier
              inkifierScriptDir={this.props.inkifierScriptDir}
              output={this.state.output}
              storyContent={this.state.storyContent}
              width="50%"
              height="100%"
            />
          </div> :
          <div className={styles.loading}>Loading example.</div>}
      </div>
    </Lazy>
  );

  importExample = () => {
    const { id } = this.props;
    if (!id) {
      throw new Error('Example has no id prop.');
    }

    import(`../../ink/examples/${id}.ink`).then(({
      storyContent,
      output,
      text,
    }) => this.setState({
      output,
      storyContent,
      text,
      loaded: true,
    }));
  };
};
