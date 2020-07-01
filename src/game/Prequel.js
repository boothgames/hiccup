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
  flux: 'facebook',
  react: 'facebook',
  graphsql: 'facebook',
  jest: 'facebook',
  angular: 'google',
  flutter: 'google',
  tensor: 'google',
  firebase: 'google',
  webRTC: 'google',
  kafka: 'linkedin',
  swift: 'apple',
  kubernetes: 'oracle',
  kotlin: 'jetbrains',
  couch: 'apache',
  cassandra: 'apache',
  hadoop: 'apache',
  gocd: 'thoughtworks',
  cruisecontrol: 'thoughtworks',
  selenium: 'thoughtworks',
  terraform: 'hashicorp',
  consul: 'hashicorp',
  fedora: 'redhat',
  xbox: 'microsoft',
  trello: 'atlassian',
  confluence: 'atlassian',
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

  congratsImage = require('./congrats.png');

  renderMessage() {
    const { status, countDown } = this.state;
    switch (status) {
      case 'ready':
        return (
          <Page>
            <div class="thoughtworks-image">
              <a href="https://www.thoughtworks.com">
                <img class="thoughtworks" src="https://www.thoughtworks.com/imgs/tw-logo.svg" />
              </a>
            </div>
            <div class="Thoughtworks-microsi">
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/thoughtworks-at-gids2020">
                  &lt;&lt; GIDS 2020
                </Navbar.Brand>
              </Navbar>
            </div>
            <div class="banner">
              <img class="tw-banner" src={require('./GIDS-Virtual-Banner-Desktop.png')} />
              <p class="gids-title">ThoughtWorks @ GIDS 2020</p>
            </div>
            <Container>
              <h1 class="Lets-play"> Let's play!</h1>
              <div class="play-game-box">
                <Container id="game-box">
                  <div class="game-preview">
                    <img class="preview-image" src={require('./screen2.png')} />
                    <p class="game-name">Match the logo</p>
                  </div>
                  <div class="Level-1-Instructions">
                    <p class="text-style-1">Instructions:</p>
                    <ul>
                      <li>
                        Match the software logo to its creators by simply dragging and dropping them
                        in the top grid.
                      </li>
                      <li>The game is timed.You get 25 seconds to match 5 logos.</li>
                      <li>Your score will be displayed at the end of the game.</li>
                    </ul>
                    <button class="play-button" onClick={this.logokickoff}>
                      Start playing
                    </button>
                  </div>
                </Container>
              </div>
              <div style={{ padding: '30px' }}></div>
            </Container>
          </Page>
        );
      case 'logo-start':
        return (
          <Page>
            <div class="thoughtworks-image">
              <a href="https://www.thoughtworks.com">
                <img class="thoughtworks" src="https://www.thoughtworks.com/imgs/tw-logo.svg" />
              </a>
            </div>
            <div class="Thoughtworks-microsi">
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/thoughtworks-at-gids2020">
                  &lt;&lt; GIDS 2020
                </Navbar.Brand>
              </Navbar>
            </div>
            <div class="banner">
              <img class="tw-banner" src={require('./GIDS-Virtual-Banner-Desktop.png')} />
              <p class="gids-title">ThoughtWorks @ GIDS 2020</p>
            </div>

            <Container>
              <h1 class="Lets-play"> Match the logo</h1>
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
            <br></br>
            <br></br>
          </Page>
        );
      case 'game-over':
        return (
          <Page>
            <div class="thoughtworks-image">
              <a href="https://www.thoughtworks.com">
                <img class="thoughtworks" src="https://www.thoughtworks.com/imgs/tw-logo.svg" />
              </a>
            </div>
            <div class="Thoughtworks-microsi">
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/thoughtworks-at-gids2020">
                  &lt;&lt; GIDS 2020
                </Navbar.Brand>
              </Navbar>
            </div>
            <div class="banner">
              <img class="tw-banner" src={require('./GIDS-Virtual-Banner-Desktop.png')} />
              <p class="gids-title">ThoughtWorks @ GIDS 2020</p>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Container>
              <div class="play-game-box">
                <Container id="game-box">
                  <div class="game-preview">
                    <img class="preview-image" src={this.congratsImage} />
                  </div>
                  <div class="Level-1-Instructions">
                    <p class="text-style-1">You scored {this.calculateScore()}/5.</p>
                    <p class="text-style-1">Thanks for playing! Hope you had fun.</p>
                    <p>
                      Please take 2 mins and{' '}
                      <a href="https://www.thoughtworks.com/careers/access?utm_source=event&utm_medium=virtual&utm_campaign=GIDS2020&utm_term=india">
                        sign up
                      </a>{' '}
                      for Access ThoughtWorks Careers to stay in touch with the latest happenings
                      and know about career opportunities at ThoughtWorks.
                      <br />
                    </p>
                  </div>
                  <button
                    class="play-button"
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      window.location.href =
                        'https://www.thoughtworks.com/thoughtworks-at-gids2020';
                    }}
                  >
                    Back to main page
                  </button>
                </Container>
              </div>
            </Container>
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
