import React from 'react';
import _ from 'lodash';
import ProgressBar from 'react-progress-bar-plus';
import PropTypes from 'prop-types';
import Page from '../common/Page';
import './dashboard.css';
import countDownTimer from '../lib/timer';

export default class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0 };
  }

  componentDidMount() {
    const { onRead } = this.props;
    const duration = 10000;
    this.timer = countDownTimer({
      tick: ({ ms }) => {
        const progress = 100 - Math.round((((duration - ms) / duration) * 100));
        this.setState({ progress });
      },
      completed: onRead,
      duration,
      refresh: 100,
    });
  }

  componentWillUnmount() {
    this.timer.stop();
    this.timer = null;
  }

  render() {
    const { games } = this.props;
    const { progress } = this.state;
    return (
      <Page>
        <div className="gooey-Ex-large">
          <ProgressBar percent={progress} spinner="right"/>
          <h2 className='gameName-info'>To Save the Server, you need to complete</h2>
          <ul>
            {_.map(games, ({ name, title }) => {
              return (
                <li key={name}>
                  <span className="dot"/>
                  {title}
                </li>
              );
            })}
          </ul>
        </div>
      </Page>
    );
  };
}

Instruction.propTypes = {
  games: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onRead: PropTypes.func,
};

Instruction.defaultProps = {
  onRead: _.noop,
};