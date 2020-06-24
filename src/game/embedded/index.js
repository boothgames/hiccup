import * as React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Page from '../../common/Page';
import Qa from './Qa/Qa';
import WhySoSerious from '../WhySoSerious';
import Snakes from './Snake/Snakes';
import Shop from './Shop/Shop';

import { ImagesProvider } from "../contexts/ImagesContext";

export default class Embedded extends React.Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(status) {
    const { game: { name }, onComplete } = this.props;
    onComplete(name, { action: status });
  }

  renderGame() {
    const { game: { name, metadata = {} } } = this.props;
    const { questions = [] } = metadata || {};

    switch (name) {
      case 'quiz':
        return <Qa options={questions} onComplete={this.handleComplete}/>;
      case 'smile':
        return <WhySoSerious onComplete={this.handleComplete}/>;
      case 'snakes':
        return <Snakes onComplete={this.handleComplete}/>;
      case 'logomatch':
        return <ImagesProvider
        r={require.context(
          "./Shop/images/",
          true,
          /\.(png|jpe?g|svg)$/
        )}
      > <Shop onComplete={this.handleComplete}/> </ImagesProvider>;
      default:
        return <h1>Call volunteer</h1>;
    }
  }

  render() {
    const { game: { title } } = this.props;
    return (
      <Page>
        {/* <h1>{title}</h1> */}
        {this.renderGame()}
      </Page>
    );
  }
}

Embedded.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    metadata: PropTypes.object,
  }).isRequired,
  onComplete: PropTypes.func,
};

Embedded.defaultProps = {
  onComplete: _.noop,
};