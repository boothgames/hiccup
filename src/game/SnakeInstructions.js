import React from 'react';
import _ from 'lodash';
import { Container } from 'react-bootstrap';
import './dashboard.css';
import PropTypes from 'prop-types';

export default class SnakeInstructions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div class='play-game-box'>
      <Container id='game-box'>
        <div class='game-preview'>
          <img class='preview-image' src={require('./screen2.png')} />
        </div>
        <div class='Level-1-Instructions'>
          <p class='game-name'>SNAKE QUIZ</p>
          <p class='text-style-1'>Level  Instructions:</p>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magnaaliqua.</li>
            <li>Ut enim ad minim veniam, quis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat.</li>
            <li> Third instruciton</li>
          </ul>
          <button class='play-button' onClick={this.props.snakekickoff}>
            Play
          </button>
        </div>
      </Container>
    </div>
  };
}

SnakeInstructions.propTypes = {
  onStart: PropTypes.func,
};

SnakeInstructions.defaultProps = {
  onStart: _.noop,
};