import React from 'react';
import _ from 'lodash';
import { Container } from 'react-bootstrap';
import './dashboard.css';
import PropTypes from 'prop-types';

export default class SnakeInstructions extends React.Component {
  render() {
    return (
      <div className="play-game-box">
        <Container id="game-box">
          <div className="game-preview">
            <img className="preview-image" src={require('./screen2.png')} alt="" />
          </div>
          <div className="Level-1-Instructions">
            <p className="game-name">SNAKE QUIZ</p>
            <p className="text-style-1">Level Instructions:</p>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor
                incididunt ut labore et dolore magnaaliqua.
              </li>
              <li>
                Ut enim ad minim veniam, quis nostrud exercitation ullamcolaboris nisi ut aliquip ex
                ea commodo consequat.
              </li>
              <li> Third instruciton</li>
            </ul>
            <button className="play-button" onClick={this.props.snakekickoff}>
              Play
            </button>
          </div>
        </Container>
      </div>
    );
  }
}

SnakeInstructions.propTypes = {
  onStart: PropTypes.func,
};

SnakeInstructions.defaultProps = {
  onStart: _.noop,
};
