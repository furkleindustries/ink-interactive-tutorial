import classnames from 'classnames';

import * as React from 'react';

import styles from './index.module.scss';

export class Minimizable extends React.PureComponent {
  state = { minimized: false };

  render = () => (
    <div className={classnames(styles.minimizable)}>
      <button
        className={classnames(styles.button)}
        onClick={this.toggle}
      >
        ✕
      </button>

      <div className={classnames(
        styles.subcontainer,
        { [styles.minimized]: this.state.minimized },
      )}>
        {this.props.children}
      </div>
    </div>
  );

  toggle = () => this.setState({ minimized: !this.state.minimized });
} 
