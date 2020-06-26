import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import blue from '../../../asserts/img/blue.png';
import red from '../../../asserts/img/red.png';
import './snake.css';

class Snakes extends Component {

  static getRandomInt(min, max) {
    const minimum = Math.ceil(min);
    const maximum = Math.floor(max);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  static randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }

  static didGameEnd(snake) {
    for (let i = 4; i < snake.length; i += 1) {
      const didCollide = snake[i].x === snake[0].x &&
        snake[i].y === snake[0].y;
      if (didCollide) return true;
    }
    return false;
  }

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.drawSnakePart = this.drawSnakePart.bind(this);
    this.drawSnake = this.drawSnake.bind(this);
    this.advanceSnake = this.advanceSnake.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.changeDirection = this.changeDirection.bind(this);

    this.createOption = this.createOption.bind(this);
    this.drawOption = this.drawOption.bind(this);
    this.optionEaten = this.optionEaten.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.circleAround = this.circleAround.bind(this);
    this.state = {
      gameOver: false,
      gameWon: false,
      score: 0,
      colors: {
        optionA: ['red', 'darkred'],
        optionB: ['blue', 'darkblue'],
      },
      gameStarted: false,
      question: {
        'title': '',
        'optionA': '',
        'optionB': '',
      },
      snake: [
        { x: 150, y: 150 },
        { x: 140, y: 150 },
        { x: 130, y: 150 },
        { x: 120, y: 150 },
        { x: 110, y: 150 },
      ],
      questions: [
        {
          'title': 'What is the full form of CPU?',
          'optionA': 'Central Processing Unit',
          'optionB': 'Central Progressive Unit',
          'answer': 'optionA',
        },
        {
          'title': 'What is the full form of ALU?',
          'optionA': 'Arithmetic Local Unit',
          'optionB': 'Arithmetic Logic Unit',
          'answer': 'optionB',
        },
        {
          'title': 'Joystick is ?',
          'optionA': 'An input device',
          'optionB': 'An output device',
          'answer': 'optionA',
        },
        {
          'title': 'Who among the following had developed the first commercially available portable computer?',
          'optionA': 'Ada Lovelace',
          'optionB': 'Adam Osborne',
          'answer': 'optionB',
        },
        {
          'title': 'Which among the following is a permanent storage device?',
          'optionA': 'ROM',
          'optionB': 'RAM',
          'answer': 'optionA',
        },
        {
          'title': 'Which ones is a programming language?',
          'optionA': 'HTTP',
          'optionB': 'HTML',
          'answer': 'optionB',
        },
        {
          'title': 'Wcich protocol is used to send e-mails?',
          'optionA': 'SMTP',
          'optionB': 'POP3',
          'answer': 'optionA',
        },
        {
          'title': 'What converts assembly language to machine language',
          'optionA': 'Compiler',
          'optionB': 'Assembler',
          'answer': 'optionB',
        },
        {
          'title': 'Consul is a Open Source Software',
          'optionA': 'True',
          'optionB': 'False',
          'answer': 'optionA',
        },
        {
          'title': 'extension of excel 2007 files',
          'optionA': '.xlsx',
          'optionB': '.xls',
          'answer': 'optionB',
        },
      ],
    };
  }

  componentDidMount() {
    const CANVAS_BORDER_COLOUR = 'black';
    const CANVAS_BACKGROUND_COLOUR = 'white';

    this.gameCanvas = this.canvasRef.current;
    this.gameCanvas.focus();
    const ctx = this.gameCanvas.getContext('2d');
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    ctx.strokestyle = CANVAS_BORDER_COLOUR;
    ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    ctx.strokeRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

    const snake = [
      { x: 150, y: 150 },
      { x: 140, y: 150 },
      { x: 130, y: 150 },
      { x: 120, y: 150 },
      { x: 110, y: 150 },
    ];
    this.setState({ snake, dx: 10, dy: 0 });
    const optionA = this.createOption(snake);
    const optionB = this.createOption(snake);
    const question = this.getQuestion();
    this.setState({ optionA, optionB, question });

    this.drawOption(optionA.x, optionA.y, 'optionA');
    this.drawOption(optionB.x, optionB.y, 'optionB');
    this.drawSnake(snake);
  }

  getQuestion() {
    const { questions } = this.state;
    const index = Snakes.getRandomInt(0, (questions.length - 1));
    const question = questions[index];
    questions.splice(index, 1);
    this.setState({ questions });
    return question;
  }

  drawOption(x, y, option) {
    const { colors } = this.state;
    const [fillStyle, strokeStyle] = colors[option];

    const ctx = this.gameCanvas.getContext('2d');
    ctx.fillStyle = fillStyle;
    ctx.strokestyle = strokeStyle;
    ctx.fillRect(x, y, 10, 10);
    ctx.strokeRect(x, y, 10, 10);
  }

  createOption(snake) {
    const x = Snakes.randomTen(0, this.gameCanvas.width - 10);
    const y = Snakes.randomTen(0, this.gameCanvas.height - 10);
    snake.forEach((part) => {
      const optionOnSnake = part.x === x && part.y === y;
      if (optionOnSnake)
        this.createOption();
    });
    return { x, y };
  }

  clearCanvas() {
    const ctx = this.gameCanvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    ctx.strokeRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }

  drawSnake(snake) {
    snake.forEach(this.drawSnakePart);
  }

  optionEaten(snake) {
    const { optionA, optionB } = this.state;
    const { x: x1, y: y1 } = optionA;
    const { x: x2, y: y2 } = optionB;
    if (snake[0].x === x1 && snake[0].y === y1) {
      return 'optionA';
    }
    if (snake[0].x === x2 && snake[0].y === y2) {
      return 'optionB';
    }
    return null;
  }

  circleAround(input) {
    const snake = _.clone(input);
    const hitLeftWall = snake[0].x < 0;
    if (hitLeftWall) {
      snake[0].x = this.gameCanvas.width - 10;
    }
    const hitRightWall = snake[0].x > this.gameCanvas.width - 10;
    if (hitRightWall) {
      snake[0].x = 0;
    }
    const hitTopWall = snake[0].y < 0;
    if (hitTopWall) {
      snake[0].y = this.gameCanvas.height - 10;
    }
    const hitBottomWall = snake[0].y > this.gameCanvas.height - 10;
    if (hitBottomWall) {
      snake[0].y = 0;
    }
    this.setState({ snake });
  }

  advanceSnake() {
    if (this.state.snake.length <= 0 || Snakes.didGameEnd(this.state.snake) || (this.state.questions.length === 0)) {
      this.setState({ "gameOver": true });
      this.props.onComplete('failed');
      return
    }
    if (this.state.score >= 3) {
      this.setState({ "gameWon": true });
      this.props.onComplete('completed');
      return
    }
    this.circleAround(this.state.snake);
    setTimeout(() => {
      const { dx, dy } = this.state;
      this.clearCanvas();
      const snake = this.state.snake;
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);
      const eatenOption = this.optionEaten(snake);
      const rightOption = this.state.question.answer;

      switch (eatenOption) {
        case "optionA": {
          if (rightOption !== "optionA") {
            snake.pop();
            snake.pop();
          } else {
            const score = this.state.score + 1;
            this.setState({ score });
          }
          const optionA = this.createOption(snake);
          const optionB = this.createOption(snake);
          const question = this.getQuestion();
          this.setState({ optionA, optionB, question });
          break;
        }
        case "optionB": {
          if (rightOption !== "optionB") {
            snake.pop();
            snake.pop();
          } else {
            const score = this.state.score + 1;
            this.setState({ score });
          }
          const optionA = this.createOption(snake);
          const optionB = this.createOption(snake);
          const question = this.getQuestion();
          this.setState({ optionA, optionB, question });
          break;
        }
        default: {
          snake.pop();
          break;
        }
      }


      this.drawOption(this.state.optionA.x, this.state.optionA.y, "optionA");
      this.drawOption(this.state.optionB.x, this.state.optionB.y, "optionB");
      this.drawSnake(snake);
      this.setState({ snake });
      this.advanceSnake();
    }, 100);
  }

  drawSnakePart(snakePart) {
    const ctx = this.gameCanvas.getContext('2d');
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }

  changeDirection(event) {
    let dx = 0;
    let dy = 0;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    const SPACE = 32;
    if (keyPressed === SPACE) {
      this.advanceSnake();
      this.setState({ gameStarted: true });
      return;
    }
    if (keyPressed === LEFT_KEY && !goingRight) {
      dx = -10;
      dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
      dx = 0;
      dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx = 10;
      dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
      dx = 0;
      dy = 10;
    }
    this.setState({ dx, dy });
  }

  render() {
    const { gameStarted, score, question: { title, optionA, optionB }, gameOver, gameWon } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {gameStarted ? null : <p className='snakeStart'> PRESS SPACE BAR TO START THE GAME </p>}
          <p className='snakeScore'>
            Your score:
            {' '}
            {score}
          </p>
          <div className="snakequestion">
            <p>{title}</p>
            <p>
              <img src={red} height="16" width="16" alt="red img" />
              {' '}
              -
              {' '}
              {optionA}
            </p>
            <p>
              <img src={blue} height="16" width="16" alt="blue img" />
              {' '}
              -
              {' '}
              {optionB}
            </p>
          </div>
          {' '}
          <br />
          <br />
          <canvas
            ref={this.canvasRef}
            id="gameCanvas"
            width="700"
            height="500"
            onKeyDown={(event) => {
              this.changeDirection(event);
            }}
            tabIndex="0"
          />
          {gameOver ? <p className='gameOver'>Game Over</p> : null}
          {gameWon ? <p className='youWon'>You have Won</p> : null}
        </header>
      </div>
    );
  }
}

Snakes.propTypes = {
  onComplete: PropTypes.func,
};

Snakes.defaultProps = {
  onComplete: _.noop,
};


export default Snakes;
