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
    output: '',
    storyContent: null,
    text: '',
  };

  componentDidMount = () => {
    const { id } = this.props;
    if (!id) {
      throw new Error('Example has no id prop.');
    }

    /* Very evil to do this here but I don't care, it's a free tutorial. */
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

  render = () => (
    !this.state.loaded ?
      <div>Loading example.</div> :
      <div>
        <Code>{this.state.text}</Code>
        <Inkifier
          output={this.state.output}
          storyContent={this.state.storyContent}
          width={299}
        />
      </div>
  );
};
