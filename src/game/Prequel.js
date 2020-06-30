import React from 'react';
import _ from 'lodash';
import { Col, Container, Row } from 'react-bootstrap';
import './dashboard.css';
import PropTypes from 'prop-types';
import Page from '../common/Page';
import Shop from './embedded/Shop/Shop';
import { ImagesProvider } from './contexts/ImagesContext';
import Navbar from 'react-bootstrap/Navbar';
import Snakes from './embedded/Snake/Snakes';
import SnakeInstructions from './SnakeInstructions';

const expectedAnswers = {
  airbnb: 'airbnb',
  facebook: 'facebook',
  apple: 'apple',
  atlassian: 'atlassian',
  jetbrains: 'jetbrains',
  hashicorp: 'hashicorp',
  microsoft: 'microsoft',
  netflix: 'netflix',
  redhat: 'redhat',
  sunmicrosystems: 'sunmicrosystems',
  twitter: 'twitter',
  vmware: 'vmware',
  soundcloud: 'soundcloud',
  thoughtworks: 'thoughtworks',
  nitobi: 'nitobi',
  lightbend: 'lightbend',
};

export default class Prequel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: 'ready' };
    this.start = this.start.bind(this);
    this.logokickoff = this.logokickoff.bind(this);
    this.snakekickoff = this.snakekickoff.bind(this);
    this.startSnakeGame = this.startSnakeGame.bind(this);
    this.displayScore = this.displayScore.bind(this);
  }

  actualAnswers = {};

  start() {
    const { onStart } = this.props;
    onStart();
  }

  logokickoff() {
    this.setState({ status: 'logo-start' });
  }

  snakekickoff() {
    this.setState({ status: 'snake-instructions' });
  }

  startSnakeGame() {
    this.setState({ status: 'snake-start' });
  }

  displayScore() {
    this.setState({ status: 'game-over' });
  }

  calculateScore() {
    var score = 0;
    Object.keys(this.actualAnswers).map(key => {
      if (expectedAnswers[key] == this.actualAnswers[key]) {
        score++;
      }
    });
    this.actualAnswers = {};
    return score;
  }

  congratsImage = require('./congrats.png')

  renderMessage() {
    const { status, countDown } = this.state;
    switch (status) {
      case 'ready':
        return (
          <Page>
            <div class="logo">
              <img class='tw-logo' src="https://www.thoughtworks.com/imgs/tw-logo.svg" />
            </div>
            <div class='banner'>
              <img class='tw-banner' src={require("./GIDS-Virtual-Banner-Desktop.png")} />
              <p class='gids-title'>ThoughtWorks @ GIDS 2020</p>
            </div>
            <div class="Thoughtworks-microsi">
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/thoughtworks-at-gids2020">
                  &lt; ThoughtWorks @ GIDS 2020
                </Navbar.Brand>
              </Navbar>
            </div>
            <Container>
              <h1 class="Lets-play"> Logo Match</h1>
              <div class="play-game-box">
                <Container id="game-box">
                  <div class="game-preview">
                    <img class="preview-image" src={require('./screen2.png')} />
                    <p class="game-name">Puzzle Challenge</p>
                  </div>
                  <div class="Level-1-Instructions">
                    <p class="text-style-1">Level 1 Instructions:</p>
                    <ul>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod
                        tempor incididunt ut labore et dolore magnaaliqua.
                      </li>
                      <li>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamcolaboris nisi ut
                        aliquip ex ea commodo consequat.
                      </li>
                      <li> Third instruciton</li>
                    </ul>
                    <button class="play-button" onClick={this.logokickoff}>
                      Play
                    </button>
                  </div>
                </Container>
              </div>
              <br></br>
              <br></br>
            </Container>
            <div onClick={this.logokickoff}></div>
          </Page>
        );
      case 'logo-start':
        return (
          <Page>
            <div class="logo">
              <img class='tw-logo' src="https://www.thoughtworks.com/imgs/tw-logo.svg" />
            </div>
            <div class='banner'>
              <img class='tw-banner' src={require("./GIDS-Virtual-Banner-Desktop.png")} />
              <p class='gids-title'>ThoughtWorks @ GIDS 2020</p>
            </div>
            <div class="Thoughtworks-microsi">
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/thoughtworks-at-gids2020">
                  &lt; ThoughtWorks @ GIDS 2020
                </Navbar.Brand>
              </Navbar>
            </div>
            <Container>
              <h1 class="Lets-play"> Logo Match</h1>
              <div class="play-game-box">
                <Container id="game-box">
                  <ImagesProvider
                    r={require.context('./embedded/Shop/images/', true, /\.(png|jpe?g|svg)$/)}
                  >
                    {' '}
                    <Shop
                      playSnakeGame={this.snakekickoff}
                      displayScore={this.displayScore}
                      actualAnswers={this.actualAnswers}
                      onComplete={this.handleComplete}
                    />{' '}
                  </ImagesProvider>
                </Container>
              </div>
            </Container>
            <div onClick={this.logokickoff}></div>
            <br></br>
            <br></br>
          </Page>
        );
      case 'game-over':
        return (
          <Page>
            <div class="logo">
              <img class='tw-logo' src="https://www.thoughtworks.com/imgs/tw-logo.svg" />
            </div>
            <div class='banner'>
              <img class='tw-banner' src={require("./GIDS-Virtual-Banner-Desktop.png")} />
              <p class='gids-title'>ThoughtWorks @ GIDS 2020</p>
            </div>
            <div class="Thoughtworks-microsi">
              <Navbar>
                <Navbar.Brand href=" https://www.thoughtworks.com/thoughtworks-at-gids2020">
                  &lt; ThoughtWorks @ GIDS 2020
                </Navbar.Brand>
              </Navbar>
            </div>
            <Container>
              <h1 class="Lets-play"> Logo Match</h1>
              <div class="play-game-box">
                <Container id="game-box">
                  <div class="game-preview">
                    <img class="preview-image" src={this.congratsImage} />
                  </div>
                  <div class="Level-1-Instructions">
                    <p class="text-style-1">Congratulations!!</p>
                    <p class="text-style-1">Your score is {this.calculateScore()}/5.</p>
                    <p>
                      Please take 2 minutes to fill this{' '}
                      <a href="https://www.thoughtworks.com/careers/access?utm_source=event&utm_medium=virtual&utm_campaign=GIDS2020&utm_term=india">
                        form.
                      </a>
                      <br />
                    </p>
                  </div>
                </Container>
              </div>
            </Container>
            <div onClick={this.logokickoff}></div>
            <br></br>
            <br></br>
          </Page>
        );
      case 'snake-start':
        return <Snakes onComplete={this.handleComplete} />;
      case 'snake-instructions':
        return <SnakeInstructions snakekickoff={this.startSnakeGame} />;
      case 'begin':
        return (
          <Page>
            <Container>
              <Row>
                <Col>
                  <div className="save-the-server">
                    <p>
                      You are in a world that runs on
                      <strong> Open Source Software.</strong> But there are forces beyond reason,
                      that are constantly threatening the ways of the internet.{' '}
                    </p>
                    <p>
                      As you’re reading this,
                      <strong> hackers</strong> are breaking into your most-dependable open source
                      web server.{' '}
                    </p>
                    <p>
                      The future of internet is in
                      <strong> your hands</strong> right now. Complete all levels of the challenge
                      and save the day!
                    </p>
                    <div className="action">
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a className="link" onClick={this.start}>
                        Save the Server
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Page>
        );
      default:
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return <a>Welcome</a>;
    }
  }

  render() {
    return this.renderMessage();
  }
}

Prequel.propTypes = {
  onStart: PropTypes.func,
};

Prequel.defaultProps = {
  onStart: _.noop,
};
