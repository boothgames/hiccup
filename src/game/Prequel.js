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

const preloadedImages = require.context('./embedded/Shop/images/', true, /\.(png|jpe?g|svg)$/)

const jumbledCodeQuestions = [
  {
    question: 'Problem Statement: Check whether a number "n" is a prime number. n > 1',
    code: [
      {value: 'for (int i = 2; i < n; i++)', key: 0},
      {value: 'if (n % i == 0)', key: 1},
      {value: 'return Not a prime number', key: 2},
      {value: 'end if', key: 3},
      {value: 'end loop', key: 4},
      {value: 'return Prime Number', key: 5},
    ],
  },
  {
    question: 'Problem Statement: Bubble sort list of numbers "S"',
    code: [
      {value: 'do', key: 0},
      {value: 'swapped = false', key: 1},
      {value: 'for each i in 1 to length(S) - 1 ', key: 2},
      {value: 'if S[i-1]>S[i] then', key: 3},
      {value: 'swap(S[i-1],S[i]); swapped = true;', key: 4},
      {value: 'end if', key: 5},
      {value: 'end for', key: 6},
      {value: 'while swapped', key: 7},
    ],
  },
  {
    question: 'Problem Statement: Check whether the list "a" of size "n" has the desired item "x"',
    code: [
      {value: 'for i=0 to n-1 do', key: 0},
      {value: 'if a[i]==x then', key: 1},
      {value: 'return "x" is in the list', key: 2},
      {value: 'end if', key: 3},
      {value: 'end for', key: 4},
      {value: 'return "x" is not in the list', key: 5},
    ],
  },
  {
    question: 'Problem Statement: Find square root of "n" using newtons method."l" is Tolerance level',
    code: [
      {key: 0, value: 'double root; double x = n;'},
      {value: 'while (1) ', key: 1},
      {value: 'root = 0.5 * (x + (n / x)); ', key: 2},
      {value: 'if (abs(root - x) < l) ', key: 3},
      {value: 'break;', key: 4},
      {value: 'end if; ', key: 5},
      {value: 'x = root; ', key: 6},
      {value: 'end while', key: 7},
      {value: 'return root;', key: 8},
    ],
  },
  { 
    question: 'Problem Statement: Find an element "k" from a Binary search tree "T".',
    code: [
      {key: 0, value: 'node = root[T]'},
      {value: 'while node != NIL and k != key[node] do', key: 1},
      {value: 'if k < key[node]', key: 2},
      {value: 'node = left[node]', key: 3},
      {value: 'else', key: 4},
      {value: 'node = right[node]', key: 5},
      {value: 'end if else', key: 6},
      {value: 'end while', key: 7},
      {value: 'return node', key: 8},
    ],
  },
  {
    question: 'Problem Statement: Print sum of two numbers x and y.',
    code: [
      {key: 0, value: 'while (y != 0) '},
      {value: 'int carry = x & y;', key: 1},
      {value: 'x = x ^ y;', key: 2},
      {value: 'y = carry << 1;', key: 3},
      {value: 'end while', key: 4},
      {value: 'Print x', key: 5},
    ],
  },
  {
    question: 'Problem Statement: Swap two numbers x and y and print number1 = 20 number2 = 10.',
    code: [
      {value: 'x =10, y =20;', key: 0},
      {value: 'x = x + y;', key: 1},
      {value: 'y = x - y;', key: 2},
      {value: 'x = x - y;', key: 3},
      {value: 'Print number1 = x  number2 = y', key: 4},
    ],
  },
  {
    question: 'Problem Statement: Check whether a string is a palindrome or not.',
    code: [
      {value: 'left = 0, right = text.length - 1', key: 0},
      {value: 'while (left < right)', key: 1},
      {value: 'if text[left] != text[right]', key: 2},
      {value: 'return Not a Palindrome', key: 3},
      {value: 'end if', key: 4},
      {value: 'left = left + 1, right = right - 1', key: 5},
      {value: 'end while', key: 6},
      {value: 'return Palindrome', key: 7},
    ],
  },
  {
    question: 'Problem Statement: Check whether a number is binary or not. Ex:101 is binary, 1321 is not.',
    code: [
      {value: 'while (number != 0)', key: 0},
      {value: 'if (number % 10 > 1)', key: 1},
      {value: 'return Not a Binary number', key: 2},
      {value: 'end if', key: 3},
      {value: 'number = number / 10;', key: 4},
      {value: 'end while', key: 5},
      {value: 'return Binary number', key: 6},
    ],
  },
  {
    question: 'Problem Statement: Check whether an integer "N" is Automorphic number.i.e Its square ends in the same digits as the number itself',
    code: [
      {value: 'int square = N * N', key: 0},
      {value: 'while (N > 0)', key: 1},
      {value: 'if (N % 10 != sq % 10)', key: 2},
      {value: 'return Not Automorphic', key: 3},
      {value: 'end if', key: 4},
      {value: 'N /= 10; square /= 10;', key: 5},
      {value: 'end while', key: 6},
      {value: 'return Automorphic', key: 7},
    ],
  },
  {
    question: 'Problem Statement: Print common elements in three sorted integer arrays ar1, ar2, ar3 of lengths n1,n2 and n3.',
    code: [
      {value: 'int i = 0, j = 0, k = 0', key: 0},
      {value: 'while (i < n1 && j < n2 && k < n3)', key: 1},
      {value: 'if (ar1[i] == ar2[j] && ar2[j] == ar3[k])', key: 2},
      {value: 'Print ar[i]; i++,j++,k++;', key: 3},
      {value: 'else if (ar1[i] < ar2[j]) then i++', key: 4},
      {value: 'else if (ar2[j] < ar3[k]) then j++', key: 5},
      {value: 'else k++;', key: 6},
      {value: 'end if else', key: 7},
      {value: 'end while', key: 8},
    ],
  },
  {
    question: 'Problem Statement: Find if there is a subarray with sum 0.Integer array "arr" of size "n".',
    code: [
      {value: 'set<int> sumSet; sum = 0;', key: 0},
      {value: 'for (int i = 0 ; i < n ; i++) ', key: 1},
      {value: 'sum += arr[i];', key: 2},
      {value: 'if (sum == 0 || sumSet.find(sum) != sumSet.end())', key: 3},
      {value: 'return true', key: 4},
      {value: 'end if ', key: 5},
      {value: 'sumSet.insert(sum);', key: 6},
      {value: 'end for', key: 7},
      {value: 'return false', key: 8},
    ],
  },
  {
    question: 'Problem Statement: Find largest sum contiguous subarray.Integer array "a" of size "n".',
    code: [
      {value: 'maxSum = INT_MIN; sum = 0; ', key: 0},
      {value: 'for (int i = 0 ; i < n ; i++) ', key: 1},
      {value: 'sum = sum + a[i]', key: 2},
      {value: 'if (maxSum < sum) then maxSum = sum;', key: 3},
      {value: 'if sum < 0 then sum = 0;', key: 4},
      {value: 'end for', key: 5},
      {value: 'return maxSum', key: 6},
    ],
  },
  {
    question: 'Problem Statement: Reverse a linked list with head node "head".',
    code: [
      {value: 'Node current=head,previous=null,forward=null', key: 0},
      {value: 'while(current.next != null)', key: 1},
      {value: 'forward = current.next', key: 2},
      {value: 'current.next = previous', key: 3},
      {value: 'previous = current', key: 4},
      {value: 'current = forward', key: 5},
      {value: 'end while', key: 6},
      {value: 'head=current; head.next=previous;', key: 7},
      {value: 'return head', key: 7},
    ],
  },
  {
    question: 'Problem Statement: Preorder traversal of binary tree.',
    code: [
      {value: 'void preOrder(TreeNode node) {', key: 0},
      {value: 'if (node == null)', key: 1},
      {value: 'return', key: 2},
      {value: 'end if', key: 3},
      {value: 'print node.data', key: 4},
      {value: 'preOrder(node.left)', key: 5},
      {value: 'preOrder(node.right)', key: 6},
      {value: '}', key: 7},
    ],
  },
  {
    question: 'Problem Statement: Postorder traversal of binary tree.',
    code: [
      {value: 'void postOrder(TreeNode node) {', key: 0},
      {value: 'if (node == null)', key: 1},
      {value: 'return', key: 2},
      {value: 'end if', key: 3},
      {value: 'postOrder(node.left)', key: 4},
      {value: 'postOrder(node.right)', key: 5},
      {value: 'print node.data', key: 6},
      {value: '}', key: 7},
    ],
  },
  {
    question: 'Problem Statement: Inorder traversal of binary tree.',
    code: [
      {value: 'void inOrder(TreeNode node) {', key: 0},
      {value: 'if (node == null)', key: 1},
      {value: 'return', key: 2},
      {value: 'end if', key: 3},
      {value: 'inOrder(node.left)', key: 4},
      {value: 'print node.data', key: 5},
      {value: 'inOrder(node.right)', key: 6},
      {value: '}', key: 7},
    ],
  },
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
  kafka: 'apache',
  swift: 'apple',
  kubernetes: 'google',
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
  photoshop: 'adobe',
  intellij: 'jetbrains',
  csharp: 'microsoft'
};

const virtualBannerPng = require('./GIDS-Virtual-Banner-Desktop.png')

const congratsImage = require('./congrats.png');

const screen2png = require('./screen2.png')

const grouppng = require('./group.jpeg')

export default class Prequel extends React.Component {

  actualAnswers = {};

  score = 0;

  link = "https://www.thoughtworks.com/careers/access?utm_source=event&utm_medium=virtual&utm_campaign=GIDS2020&utm_term=india"

  currentCodeJumble = {};

  currentJumbledOrder = [];

  correctOrder = [];

  constructor(props) {
    super(props);
    this.state = {status: 'intro'};
    this.start = this.start.bind(this);
    this.logokickoff = this.logokickoff.bind(this);
    this.showLevel1Page = this.showLevel1Page.bind(this);
    this.snakekickoff = this.snakekickoff.bind(this);
    this.startSnakeGame = this.startSnakeGame.bind(this);
    this.startCodeJumbleGame = this.startCodeJumbleGame.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.showCodeJumbleInstructions = this.showCodeJumbleInstructions.bind(this);
    this.updateScoreAndForCodeJumble = this.updateScoreAndForCodeJumble.bind(this);
  }

  getJumbledCodeQuestion() {
    const min = 1
    const max = jumbledCodeQuestions.length
    const randomNumber = min + Math.random() * (max - min)
    // eslint-disable-next-line prefer-destructuring
    this.currentCodeJumble = jumbledCodeQuestions[Math.ceil(randomNumber) - 1];
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

  showLevel1Page() {
    this.setState({status: 'ready'});
  }

  snakekickoff() {
    this.setState({status: 'snake-instructions'});
  }

  startSnakeGame() {
    this.setState({status: 'snake-start'});
  }

  showCodeJumbleInstructions() {
    this.setState({status: 'code_jumble_instructions'});
  }

  startCodeJumbleGame() {
    this.setState({status: 'code_jumble_start'});
    publishGameMessage('code-jumble', {action: 'started'})
  }

  displayScore() {
    this.setState({status: 'game-over'});
  }

  displayScoreForCodeJumble() {
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
      case 'intro':
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
                  </div>
                  <div className="Level-1-Instructions">
                    <p className="text-style-1">
                      Welcome to ThoughtWorks virtual games, a fun tech challenge for you to take a break from the day-long sessions.
                    </p>
                    <p className="text-style-1">
                      There are 2 levels to this challenge:
                    </p>
                    <ul>
                      <li className="text-style-1">
                      Level 1 - Match the logo.
                      </li>
                      <li className="text-style-1">
                        Level 2 - Code jumble.
                      </li>
                    </ul>
                    <p className="text-style-1">
                      Are you ready? Lets head over to the game instructions.
                    </p>
                    <br/>
                    <button className="play-button" type="button" onClick={this.showLevel1Page}>
                    Next
                    </button>
                  </div>
                </Container>
              </div>
              <div style={{padding: '30px'}}/>
            </Container>
          </Page>
        );
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
                      <li>
                        If you get a minimum of 4 out of 5 logos matched correctly you will move on to level 2.
                      </li>
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
                    r={preloadedImages}
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
                      {this.calculateScore() > 3 ? 
                      (
                        <div>
                          <p className="text-style-1">
                        Congratulations!  You scored 
                            {' '}
                            {this.score}
  /5. 
                            <br/>
                            <br/>
                            <p className="text-style-1">Lets move on to level 2 - Code jumble.</p>
                          </p>
                        </div>
  ) : (
    <div>
      <p className="text-style-1">
                        You scored
        {' '}
        {this.score}
                        /5.
      </p>
      <p className='text-style-1'>Thanks for playing! Hope you had fun.</p>
      <p className="text-style-2">
      To stay up-to-date on events, news and job opportunities please
        {' '}
        <a href={this.link}>
        subscribe
        </a>
        {' '}
        for our monthly newsletter, Access ThoughtWorks careers.
        <br/>
      </p>
    </div>
  ) }
                      {publishGameMessage('logo-match', {action: this.score > 3 ? 'completed' : 'failed', score: this.score})}
                      <br/>
                      {this.score > 1 ? (
                        <div className="code_jumble_buttons-box">
                          <button
                            className="play-button"
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                              this.showCodeJumbleInstructions();
                            }}
                          >
                            Next
                          </button>
                        </div>
                      ) : (
                        <button
                          className="play-button"
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            this.logokickoff();
                          }}
                        >
                          Try Again!
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
      case 'code_jumble_instructions':
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
              <div className="play-game-box">
                <Container id="game-box">
                  <div className="game-preview">
                    <img className="preview-image" src={screen2png} alt=""/>
                    <p className="game-name">Code Jumble</p>
                  </div>
                  <div className="Level-1-Instructions">
                    <p className="text-style-1">Instructions:</p>
                    <ul>
                      <li>
                      At the top, there will be a problem statement, followed by a set of jumbled code snippets.
                      </li>
                      <li>You have to re-arrange the code snippets in the correct order by simply dragging and dropping them to get the desired outcome.</li>
                      <li>The game is timed. You get 90 seconds to rearrange the jumbled code snippets in the right order.</li>
                    </ul>
                    <br/>
                    <button className="play-button" type="button" onClick={this.startCodeJumbleGame}>
                      Start playing
                    </button>
                  </div>
                </Container>
              </div>
              <div style={{padding: '30px'}}/>
            </Container>
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
            <div
              style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#2c2c2c",
          opacity: "0.6"
        }}
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
                      {' '}
                      {this.score === 1 ? 'Congratulations! You got it right!' : 'Sorry! That was incorrect.'}
                      {publishGameMessage('code-jumble', {action: this.score === 1 ? 'completed' : 'failed', score: this.score})}
                    </p>
                    <p className="text-style-1">Thanks for playing! Hope you had fun.</p>
                    <div>
                      <p className="text-style-2">
                      To stay up-to-date on events, news and job opportunities please
                        {' '}
                        <a href={this.link}>
        subscribe
                        </a>
                        {' '}
        for our monthly newsletter, Access ThoughtWorks careers.
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
