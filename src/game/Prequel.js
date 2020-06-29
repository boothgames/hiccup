import React from 'react';
import _ from 'lodash';
import { Col, Container, Row } from 'react-bootstrap';
import './dashboard.css';
import PropTypes from 'prop-types';
import Page from '../common/Page';
import Shop from './embedded/Shop/Shop';
import { ImagesProvider } from "./contexts/ImagesContext";
import Navbar from 'react-bootstrap/Navbar'
import Snakes from './embedded/Snake/Snakes';
import SnakeInstructions from './SnakeInstructions';

const expectedAnswers = {
  "airbnb": "airbnb",
  "facebook": "facebook",
  "apple": "apple",
  "atlassian": "atlassian",
  "jetbrains": "jetbrains",
  "hashicorp": "hashicorp",
  "microsoft": "microsoft",
  "netflix": "netflix",
  "redhat": "redhat",
  "sunmicrosystems": "sunmicrosystems",
  "twitter": "twitter",
  "vmware": "vmware",
  "soundcloud": "soundcloud",
  "thoughtworks": "thoughtworks",
  "nitobi": "nitobi",
  "lightbend": "lightbend",
}

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
    this.calculateScore()
    this.setState({ status: 'game-over' });
  }

  calculateScore() {
    var score = 0;
    Object.keys(this.actualAnswers).map(key => {
      if (expectedAnswers[key] == this.actualAnswers[key]) {
        score++;
      }
    })
    this.actualAnswers = {};
    return score;
  }

  renderMessage() {
    const { status, countDown } = this.state;
    switch (status) {
      case 'ready':
        return (
          <Page>
            <div class='logo'>
              <img src='https://www.thoughtworks.com/imgs/tw-logo.svg' />
            </div>
            <img src="https://dynamic.thoughtworks.com/landing_pages/hero_banner_image_desktop-665554b185264f7ef2da169a815ab300.jpeg" />
            <div class='Thoughtworks-microsi'>
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/arts">&lt;  Thoughtworks microsite page
              </Navbar.Brand>
              </Navbar>
            </div>
            <Container>
              <h1 class='Lets-play'> Let's play!</h1>
              <div class='play-game-box'>
                <Container id='game-box'>
                  <div class='game-preview'>
                    <img class='preview-image' src={require('./screen2.png')} />
                  </div>
                  <div class='Level-1-Instructions'>
                    <p class='game-name'>LOGO MATCHING</p>
                    <p class='text-style-1'>Level 1 Instructions:</p>
                    <ul>
                      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magnaaliqua.</li>
                      <li>Ut enim ad minim veniam, quis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat.</li>
                      <li> Third instruciton</li>
                    </ul>
                    <button class='play-button' onClick={this.logokickoff}>
                      Play
                      </button>
                  </div>
                </Container>
              </div>
              <br></br>
              <br></br>
              <div class='play-game-box'>
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
                    <button class='play-button' onClick={this.startSnakeGame}>
                      Play
                      </button>
                  </div>
                </Container>
              </div>
              <br></br>
              <br></br>
            </Container>
            <div onClick={this.logokickoff}>
            </div>
          </Page >
        );
      case 'logo-start':
        return (
          <Page>
            <div class='logo'>
              <img src='https://www.thoughtworks.com/imgs/tw-logo.svg' />
            </div>
            <img src="https://dynamic.thoughtworks.com/landing_pages/hero_banner_image_desktop-665554b185264f7ef2da169a815ab300.jpeg" />
            <div class='Thoughtworks-microsi'>
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/arts">&lt;  Thoughtworks microsite page
              </Navbar.Brand>
              </Navbar>
            </div>
            <Container>
              <h1 class='Lets-play'> Let's play!</h1>
              <div class='play-game-box'>
                <Container id='game-box'>
                  <ImagesProvider
                    r={require.context(
                      "./embedded/Shop/images/",
                      true,
                      /\.(png|jpe?g|svg)$/
                    )}
                  > <Shop playSnakeGame={this.snakekickoff} displayScore={this.displayScore} actualAnswers={this.actualAnswers} onComplete={this.handleComplete} /> </ImagesProvider>
                </Container>
              </div>
            </Container>
            <div onClick={this.logokickoff}>
            </div>
          </Page >
        );
      case 'game-over':
        return (<Page>
          <div class='logo'>
            <img src='https://www.thoughtworks.com/imgs/tw-logo.svg' />
          </div>
          <img src="https://dynamic.thoughtworks.com/landing_pages/hero_banner_image_desktop-665554b185264f7ef2da169a815ab300.jpeg" />
          <div class='Thoughtworks-microsi'>
            <Navbar>
              <Navbar.Brand href="https://www.thoughtworks.com/arts">&lt;  Thoughtworks microsite page
              </Navbar.Brand>
            </Navbar>
          </div>
          <Container>
            <h1 class='Lets-play'> Let's play!</h1>
            <div class='play-game-box'>
              <Container id='game-box'>
                <div class='game-preview'>
                  <img class='preview-image' src={require('./screen2.png')} />
                </div>
                <div class='Level-1-Instructions'>
                  <p class='game-name'>LOGO MATCHING</p>
                  <p class='text-style-1'>Level 1 Instructions:</p>
                  <ul>
                    <li>Congrats!!</li>
                  </ul>
                  <button class='play-button' onClick={this.logokickoff}>
                    Play
                      </button>
                </div>
              </Container>
            </div>
          </Container>
          <div onClick={this.logokickoff}>
          </div>
        </Page >
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
                      <strong> Open Source Software.</strong>
                      {' '}
                      But there are forces
                      beyond reason, that
                      are constantly threatening the ways of the internet.
                      {' '}
                    </p>
                    <p>
                      As you’re reading this,
                      <strong> hackers</strong>
                      {' '}
                      are breaking
                      into your most-dependable open source web server.
                      {' '}
                    </p>
                    <p>
                      The future of internet is in
                      <strong> your hands</strong>
                      {' '}
                      right now. Complete all levels of the
                      challenge and save the day!
                    </p>
                    <div className="action">
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a className="link" onClick={this.start}>Save the Server</a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>

          </Page>
        );
      default:
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return (<a>Welcome</a>);
    }
  }

  render() {
    return this.renderMessage();
  };
}

Prequel.propTypes = {
  onStart: PropTypes.func,
};

Prequel.defaultProps = {
  onStart: _.noop,
};