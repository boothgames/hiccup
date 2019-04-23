import React, { Component } from 'react';
import blue from '../asserts/img/blue.png';
import red from '../asserts/img/red.png';

class Snakes extends Component {
  constructor(){
    super();
    this.drawSnakePart = this.drawSnakePart.bind(this);
    this.drawSnake = this.drawSnake.bind(this);
    this.advanceSnake = this.advanceSnake.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.changeDirection = this.changeDirection.bind(this);

    this.randomTen = this.randomTen.bind(this);
    this.createOption = this.createOption.bind(this);
    this.drawOption = this.drawOption.bind(this);
    this.optionEaten = this.optionEaten.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.didGameEnd = this.didGameEnd.bind(this);
    this.state = {
      gameOver: false,
      gameWon: false,
      score: 0,
      colors: {
        optionA: ["red", "darkred"],
        optionB: ["blue","darkblue"]
      },
      question: {
        "title": "",
        "optionA": "",
        "optionB": ""
      },
      snake: [
        {x: 150, y: 150},
        {x: 140, y: 150},
        {x: 130, y: 150},
        {x: 120, y: 150},
        {x: 110, y: 150}
      ],
      questions: [
        {
          "title": "What is the full form of CPU?",
          "optionA": "Central Processing Unit",
          "optionB": "Central Progressive Unit",
          "answer": "optionA"
        },
        {
          "title": "What is the full form of ALU?",
          "optionA": "Arithmetic Local Unit",
          "optionB": "Arithmetic Logic Unit",
          "answer": "optionB"
        },
        {
          "title": "Joystick is ?",
          "optionA": "An input device",
          "optionB": "An output device",
          "answer": "optionA"
        },
        {
          "title": "Who among the following had developed the first commercially available portable computer?",
          "optionA": "Ada Lovelace",
          "optionB": "Adam Osborne",
          "answer": "optionB"
        },
        {
          "title": "Which among the following is a permanent storage device?",
          "optionA": "ROM",
          "optionB": "RAM",
          "answer": "optionA"
        },
        {
          "title": "Which ones is a programming language?",
          "optionA": "HTTP",
          "optionB": "HTML",
          "answer": "optionB"
        },
        {
          "title": "Wcich protocol is used to send e-mails?",
          "optionA": "SMTP",
          "optionB": "POP3",
          "answer": "optionA"
        },
        {
          "title": "What converts assembly language to machine language",
          "optionA": "Compiler",
          "optionB": "Assembler",
          "answer": "optionB"
        },
        {
          "title": "Consul is a Open Source Software",
          "optionA": "True",
          "optionB": "False",
          "answer": "optionA"
        },
        {
          "title": "extension of excel 2007 files",
          "optionA": ".xlsx",
          "optionB": ".xls",
          "answer": "optionB"
        },
      ]
    }
    
  }
  randomTen(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
  }

  createOption(snake) {
    const x = this.randomTen(0, this.gameCanvas.width - 10);
    const y = this.randomTen(0, this.gameCanvas.height - 10);
    snake.forEach((part) => {
      const optionOnSnake = part.x === x && part.y === y
      if (optionOnSnake)
        this.createOption();
    });
    return {x, y}
  }
  
  drawOption(x, y, option) {
    const ctx = this.gameCanvas.getContext("2d");
    ctx.fillStyle = this.state.colors[option][0]
    ctx.strokestyle = this.state.colors[option][1]
    ctx.fillRect(x, y, 10, 10);
    ctx.strokeRect(x, y, 10, 10);
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getQuestion(){
    const questions = this.state.questions;
    const index = this.getRandomInt(0, (questions.length - 1));
    const question = questions[index];
    questions.splice(index,1)
    this.setState({questions})
    return question; 
  }
  componentDidMount(){
    const CANVAS_BORDER_COLOUR = 'black';
    const CANVAS_BACKGROUND_COLOUR = "white";

      this.gameCanvas = this.refs.canvas
      this.gameCanvas.focus();
      var ctx = this.gameCanvas.getContext("2d");
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      ctx.strokestyle = CANVAS_BORDER_COLOUR;
      ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
      ctx.strokeRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

      let snake = [
        {x: 150, y: 150},
        {x: 140, y: 150},
        {x: 130, y: 150},
        {x: 120, y: 150},
        {x: 110, y: 150}
      ];
      this.setState({snake, dx: 10,dy: 0})
      const optionA = this.createOption(snake);
      const optionB = this.createOption(snake);
      const question = this.getQuestion();
      this.setState({optionA, optionB, question});

      this.advanceSnake();
  }
  clearCanvas() {
    var ctx = this.gameCanvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    ctx.strokeRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }
  drawSnake(snake) {
    snake.forEach(this.drawSnakePart);
  }
  optionEaten(snake){
    const {x:x1,y:y1} = this.state.optionA;
    const {x:x2,y:y2} = this.state.optionB;
    if(snake[0].x === x1 && snake[0].y === y1) {
      return "optionA"
    } else if(snake[0].x === x2 && snake[0].y === y2){
      return "optionB"
    }
    return null
  }
  didGameEnd(snake) {
    for (let i = 4; i < snake.length; i++) {
      const didCollide = snake[i].x === snake[0].x &&
        snake[i].y === snake[0].y
      if (didCollide) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > this.gameCanvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > this.gameCanvas.height - 10;
    return hitLeftWall || 
           hitRightWall || 
           hitToptWall ||
           hitBottomWall
  }
  advanceSnake() {
    if(this.state.snake.length <= 0 || this.didGameEnd(this.state.snake) || (this.state.questions.length === 0)) {
      setTimeout(() => {
        this.props.onComplete("failed");
      }, 300000);
      this.setState({"gameOver": true});
      return
    }
    if(this.state.score >= 3) {
      this.setState({"gameWon": true});
      setTimeout(() => {
        this.props.onComplete("completed");
      }, 3000);
      return
    }
    setTimeout(() => {
      const {dx, dy} = this.state;
      this.clearCanvas();
      const snake = this.state.snake;
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      snake.unshift(head);
      const eatenOption = this.optionEaten(snake);
      const rightOption = this.state.question.answer;

      switch(eatenOption){
        case "optionA": {
          if(rightOption !== "optionA") {
            snake.pop();
            snake.pop();  
          } else {
            const score = this.state.score + 1;
            this.setState({score});
          }
          const optionA = this.createOption(snake);
          const optionB = this.createOption(snake);
          const question = this.getQuestion();
          this.setState({optionA, optionB, question});
          break;
        }
        case "optionB": {
          if(rightOption !== "optionB") {
            snake.pop();
            snake.pop();  
          }else {
            const score = this.state.score + 1;
            this.setState({score});
          }
          const optionA = this.createOption(snake);
          const optionB = this.createOption(snake);
          const question = this.getQuestion();
          this.setState({optionA, optionB, question});
          break;
        }
        default:{
          snake.pop();  
          break;
        } 
      }
      

      this.drawOption(this.state.optionA.x, this.state.optionA.y, "optionA");
      this.drawOption(this.state.optionB.x, this.state.optionB.y, "optionB");
      this.drawSnake(snake);
      this.setState({snake});
      this.advanceSnake();  
    }, 100);
  }
  drawSnakePart(snakePart) {
    var ctx = this.gameCanvas.getContext("2d");
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }
  changeDirection(event) {
    let dx = 0, dy = 0;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
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
    this.setState({dx, dy})
  }
  render() {
    return (
      <div className="App" >
        <header className="App-header">
        <div>
          Your score: {this.state.score}
        </div>
        <div className="snakequestion">
          {this.state.question.title}<br/>
          <img src={red} height="16" width="16"/> {this.state.question.optionA}<br/>
          <img src={blue} height="16" width="16"/> {this.state.question.optionB}<br/>
        </div> <br/><br/>
        <canvas ref="canvas" id="gameCanvas" width="700" height="500" onKeyDown={(event) => {this.changeDirection(event)}} tabIndex="0"></canvas>
        {this.state.gameOver ? <div>Game Over</div>: null}
        {this.state.gameWon ? <div>You've Won</div>: null}
        </header>
      </div>
    );
  }
}

export default Snakes;
