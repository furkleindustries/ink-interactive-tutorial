import {
  Code,
} from '../Code';
import {
  Inkifier,
} from '../Inkifier';
import {
  default as React,
} from 'react';

export class Example extends React.PureComponent {
  state = {
    loaded: false,
    storyContent: null,
    text: '',
  };

  componentDidMount = () => {
    const { id } = this.props;
    if (!id) {
      throw new Error('Example has no id prop.');
    }

    debugger;

    /* Very evil to do this here but I don't care, it's a free tutorial. */
    import(`../../ink/examples/${id}.ink`).then(({
      storyContent,
      text,
    }) => this.setState({
      storyContent,
      text,
      loaded: true,
    }));
  };

  render = () => (
    !this.state.loaded ?
      <div>Loading example.</div> :
      <div>
        <Code>{this.props.text}</Code>
        <Inkifier storyContent={this.state.storyContent} />
      </div>
  );
};
