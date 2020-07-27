import React from 'react';
import _ from 'lodash';
import {Col, Container, Row} from 'react-bootstrap';
import './dashboard.css';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Page from '../common/Page';
import Shop from './embedded/Shop/Shop';
import DraggableList from './embedded/Puzzle/DraggableList';
import {ImagesProvider} from './contexts/ImagesContext';
import Snakes from './embedded/Snake/Snakes';
import SnakeInstructions from './SnakeInstructions';
import {publishGameMessage} from '../lib/socket'
import '../style.css';

const jumbledCodeQuestions = [
  {
    question: 'Check if n is a prime number',
    code: [
      {key: 0, value: 'if (n == 1)'},
      {value: 'print 1 is not prime number', key: 1},
      {value: 'for (int i = 2; i < n; i++)', key: 2},
      {value: 'if (n % i == 0)', key: 3},
      {value: 'print n is not prime number', key: 4},
      {value: 'end loop', key: 5},
      {value: 'print n is a prime number', key: 6},
    ],
  },
  {
    question: 'Find square root of "n" using newtons method."l" is Tolerance level',
    code: [
      {key: 0, value: 'double root; double x = n;'},
      {value: 'while (1) ', key: 1},
      {value: 'root = 0.5 * (x + (n / x)); ', key: 2},
      {value: 'if (abs(root - x) < l) ', key: 3},
      {value: 'break;', key: 4},
      {value: 'x = root; ', key: 5},
      {value: 'end loop;', key: 6},
      {value: 'return root;', key: 7},
    ],
  },
  // {
  //   question: 'Print "c1=1010, c2=1100"',
  //   code: [
  //     { key: 0, value: 'int c1 = 0, c2 = 0;' },
  //     { value: 'for(int i=0;i<10;i++,c1++)', key: 1 },
  //     { value: 'for(int j=0;j<100;j++, c1++);', key: 2 },
  //     { value: 'end loop;', key: 3 },
  //     { value: 'for(int i=0; i<100; i++, c2++)', key: 4 },
  //     { value: 'for(int j=0; j<10; j++, c2++);', key: 5 },
  //     { value: 'end loop;', key: 3 },
  //     { value: 'print("c1=", c1, "c2=", c2)', key: 7 },
  //   ],
  // },
];

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

const virtualBannerPng = require('./GIDS-Virtual-Banner-Desktop.png')

const congratsImage = require('./congrats.png');

const screen2png = require('./screen2.png')

const grouppng = require('./group.png')

export default class Prequel extends React.Component {

  actualAnswers = {};

  score = 0;

  link = "https://www.thoughtworks.com/careers/access?utm_source=event&utm_medium=virtual&utm_campaign=GIDS2020&utm_term=india"

  currentCodeJumble = {};

  currentJumbledOrder = [];

  correctOrder = [];

  constructor(props) {
    super(props);
    this.state = {status: 'ready'};
    this.start = this.start.bind(this);
    this.logokickoff = this.logokickoff.bind(this);
    this.snakekickoff = this.snakekickoff.bind(this);
    this.startSnakeGame = this.startSnakeGame.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.updateScoreAndForCodeJumble = this.updateScoreAndForCodeJumble.bind(this);
  }

  getJumbledCodeQuestion() {
    // eslint-disable-next-line prefer-destructuring
    this.currentCodeJumble = _.shuffle(jumbledCodeQuestions)[0];
    this.currentJumbledOrder = _.shuffle(this.currentCodeJumble.code);
    this.correctOrder = [];
    for (let i = 0; i < this.currentJumbledOrder.length; i += 1) {
      for (let j = 0; j < this.currentJumbledOrder.length; j += 1) {
        if (this.currentJumbledOrder[j].key === i) {
          this.correctOrder[i] = j;
          break;
        }
      }
    }
    return this.currentCodeJumble;
  }

  logokickoff() {
    this.setState({status: 'logo-start'});
    publishGameMessage('logo-match', {action: 'started'})
  }

  snakekickoff() {
    this.setState({status: 'snake-instructions'});
  }

  startSnakeGame() {
    this.setState({status: 'snake-start'});
  }

  startCodeJumbleGame() {
    this.setState({status: 'code_jumble_start'});
    publishGameMessage('code-jumble', {action: 'started'})
  }

  displayScore() {
    publishGameMessage('logo-match', {action: 'completed', score: 5})
    this.setState({status: 'game-over'});
  }

  displayScoreForCodeJumble() {
    publishGameMessage('code-jumble', {action: 'completed', score: 5})
    this.setState({status: 'jumbled-game-over'});
  }

  calculateScore() {
    Object.keys(this.actualAnswers).map(key => {
      if (expectedAnswers[key] === this.actualAnswers[key]) {
        this.score += 1;
      }
      return null
    });
    this.actualAnswers = {};
    return this.score;
  }

  start() {
    const {onStart} = this.props;
    onStart();
  }

  updateOrder(order) {
    this.updateScoreAndForCodeJumble(order);
    this.displayScoreForCodeJumble();
  }

  updateScoreAndForCodeJumble(order) {
    if (_.isEqual(order.current, this.correctOrder)) {
      this.score = 1;
    } else {
      this.score = 0;
    }
  }

  renderMessage() {
    const {status} = this.state;
    switch (status) {
      case 'ready':
        return (
          <Page>
            <div className="thoughtworks-image">
              <a href="https://www.thoughtworks.com">
                <img
                  className="thoughtworks"
                  src="https://www.thoughtworks.com/imgs/tw-logo.svg"
                  alt=""
                />
              </a>
            </div>
            <div className="Thoughtworks-microsi">
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/thoughtworks-at-gids2020">
                  &lt;&lt; Back To Home Page
                </Navbar.Brand>
              </Navbar>
            </div>
            <div className="banner">
              <img
                className="tw-banner"
                src={virtualBannerPng}
                alt=""
              />
              <p className="gids-title">ThoughtWorks @ GIDS 2020</p>
            </div>
            <Container>
              <h1 className="Lets-play"> Lets play!</h1>
              <div className="play-game-box">
                <Container id="game-box">
                  <div className="game-preview">
                    <img className="preview-image" src={screen2png} alt=""/>
                    <p className="game-name">Match the logo</p>
                  </div>
                  <div className="Level-1-Instructions">
                    <p className="text-style-1">Instructions:</p>
                    <ul>
                      <li>
                        Match the software logo to its creators by simply dragging and dropping them
                        in the top grid.
                      </li>
                      <li>The game is timed. You get 25 seconds to match 5 logos.</li>
                      <li>Your score will be displayed at the end of the game.</li>
                    </ul>
                    <br/>
                    <button className="play-button" type="button" onClick={this.logokickoff}>
                      Start playing
                    </button>
                  </div>
                </Container>
              </div>
              <div style={{padding: '30px'}}/>
            </Container>
          </Page>
        );
      case 'logo-start':
        return (
          <Page>
            <div className="thoughtworks-image">
              <a href="https://www.thoughtworks.com">
                <img
                  className="thoughtworks"
                  src="https://www.thoughtworks.com/imgs/tw-logo.svg"
                  alt=""
                />
              </a>
            </div>
            <div className="Thoughtworks-microsi">
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/thoughtworks-at-gids2020">
                  &lt;&lt; Back To Home Page
                </Navbar.Brand>
              </Navbar>
            </div>
            <div className="banner">
              <img
                className="tw-banner"
                src={virtualBannerPng}
                alt=""
              />
              <p className="gids-title">ThoughtWorks @ GIDS 2020</p>
            </div>

            <Container>
              <h1 className="Lets-play"> Match the logo</h1>
              <div className="play-game-box">
                <Container id="game-box">
                  <ImagesProvider
                    r={require.context('./embedded/Shop/images/', true, /\.(png|jpe?g|svg)$/)}
                  >
                    {' '}
                    <Shop
                      playSnakeGame={this.snakekickoff}
                      displayScore={() => this.displayScore()}
                      actualAnswers={this.actualAnswers}
                      onComplete={this.handleComplete}
                    />
                    {' '}
                  </ImagesProvider>
                </Container>
              </div>
            </Container>
            <br/>
            <br/>
          </Page>
        );
      case 'code_jumble_start':
        return (
          <div className="code_jumble_bg">
            <img
              style={{
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
              }}
              src={grouppng}
              alt=""
            />
            <div className="code_jumble_title">{this.getJumbledCodeQuestion().question}</div>
            <DraggableList
              callBack={this.updateScoreAndForCodeJumble}
              items={this.currentJumbledOrder}
              updateOrder={this.updateOrder}
            />
            <div className="code_jumble_submit_button">
              <button
                className="play-button"
                type="button"
                onClick={e => {
                  e.preventDefault();
                  this.displayScoreForCodeJumble();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        );
      case 'game-over':
        return (
          <Page>
            <div className="thoughtworks-image">
              <a href="https://www.thoughtworks.com">
                <img
                  className="thoughtworks"
                  src="https://www.thoughtworks.com/imgs/tw-logo.svg"
                  alt=""
                />
              </a>
            </div>
            <div className="Thoughtworks-microsi">
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/thoughtworks-at-gids2020">
                  &lt;&lt; Back To Home Page
                </Navbar.Brand>
              </Navbar>
            </div>
            <div className="banner">
              <img
                className="tw-banner"
                src={virtualBannerPng}
                alt=""
              />
              <p className="gids-title">ThoughtWorks @ GIDS 2020</p>
            </div>
            <br/>
            <br/>
            <br/>
            <Container>
              <div className="play-game-box">
                <Container id="game-box">
                  <div className="game-preview">
                    <img className="preview-image" src={congratsImage} alt=""/>
                  </div>
                  <div className="Level-1-Instructions">
                    <p className="text-style-1">
                      You scored
                      {' '}
                      {this.calculateScore()}
                      /5.
                    </p>
                    <p className="text-style-1">Thanks for playing! Hope you had fun.</p>
                    <div>
                      <p>
                        Please take 2 mins and
                        {' '}
                        <a href={this.link}>
                          sign up
                        </a>
                        {' '}
                        for Access ThoughtWorks Careers to stay in touch with the latest happenings
                        and know about career opportunities at ThoughtWorks.
                        <br/>
                      </p>
                    </div>
                    <br/>
                    {this.score > -1 ? (
                      <div className="code_jumble_buttons-box">
                        <button
                          className="play-button"
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            this.startCodeJumbleGame();
                          }}
                        >
                          Start Code Jumble
                        </button>
                        <button
                          className="back-button"
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            window.location.href =
                              'https://www.thoughtworks.com/thoughtworks-at-gids2020';
                          }}
                        >
                          Back to main page
                        </button>
                      </div>
                    ) : (
                      <button
                        className="back-button"
                        type="button"
                        onClick={e => {
                          e.preventDefault();
                          window.location.href =
                            'https://www.thoughtworks.com/thoughtworks-at-gids2020';
                        }}
                      >
                        Back to main page
                      </button>
                    )}
                  </div>
                </Container>
              </div>
            </Container>
            <br/>
            <br/>
          </Page>
        );
      case 'jumbled-game-over':
        return (
          <Page>
            <div className="thoughtworks-image">
              <a href="https://www.thoughtworks.com">
                <img
                  className="thoughtworks"
                  src="https://www.thoughtworks.com/imgs/tw-logo.svg"
                  alt=""
                />
              </a>
            </div>
            <div className="Thoughtworks-microsi">
              <Navbar>
                <Navbar.Brand href="https://www.thoughtworks.com/thoughtworks-at-gids2020">
                  &lt;&lt; Back To Home Page
                </Navbar.Brand>
              </Navbar>
            </div>
            <div className="banner">
              <img
                className="tw-banner"
                src={virtualBannerPng}
                alt=""
              />
              <p className="gids-title">ThoughtWorks @ GIDS 2020</p>
            </div>
            <br/>
            <br/>
            <br/>
            <Container>
              <div className="play-game-box">
                <Container id="game-box">
                  <div className="game-preview">
                    <img className="preview-image" src={congratsImage} alt=""/>
                  </div>
                  <div className="Level-1-Instructions">
                    <p className="text-style-1">
                      You
                      {' '}
                      {this.score === 1 ? 'won' : 'lost'}
                    </p>
                    <p className="text-style-1">Thanks for playing! Hope you had fun.</p>
                    <div>
                      <p>
                        Please take 2 mins and
                        {' '}
                        <a href={this.link}>
                          sign up
                        </a>
                        {' '}
                        for Access ThoughtWorks Careers to stay in touch with the latest happenings
                        and know about career opportunities at ThoughtWorks.
                        <br/>
                      </p>
                    </div>
                    <br/>
                    <button
                      className="back-button"
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        window.location.href =
                          'https://www.thoughtworks.com/thoughtworks-at-gids2020';
                      }}
                    >
                      Back to main page
                    </button>
                  </div>
                </Container>
              </div>
            </Container>
            <br/>
            <br/>
          </Page>
        );
      case 'snake-start':
        return <Snakes onComplete={this.handleComplete}/>;
      case 'snake-instructions':
        return <SnakeInstructions snakekickoff={this.startSnakeGame}/>;
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
                      But there are forces beyond reason,
                      that are constantly threatening the ways of the internet.
                      {' '}
                    </p>
                    <p>
                      As you’re reading this,
                      <strong> hackers</strong>
                      {' '}
                      are breaking into your most-dependable open source
                      web server.
                      {' '}
                    </p>
                    <p>
                      The future of internet is in
                      <strong> your hands</strong>
                      {' '}
                      right now. Complete all levels of the challenge
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
