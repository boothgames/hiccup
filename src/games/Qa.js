import React, {Component} from 'react';
import {QaModel} from "./qa/QaModel";
import _ from "lodash";
import './Qa.css'

let completedTimer;

class Qa extends Component {
  constructor(props, context) {
    super(props, context);
    let qas = [];
    let shuffledQuestions = _.shuffle(props.options);

    _.each(shuffledQuestions.slice(1, 4), (question) => {
      qas.push(new QaModel(question.id, question.question, question.options, question.answer))
    });

    this.state = {
      questions: qas,
      currentQuestion: qas[getRandomArbitrary(0, qas.length - 1)],
      selectedOption: "",
      isOver: false,
      correctAnswers: 0,
      count: qas.length
    };
  }

  handleSubmit = () => {
    if (!this.state.selectedOption) {
      return
    }

    let totalCorrect = this.state.correctAnswers;
    if (this.state.selectedOption === this.state.currentQuestion.answer) {
      totalCorrect++
    }

    let questions = this.removeQuestion(this.state.currentQuestion.id);
    const isOver = _.isEmpty(questions);
    this.setState({
      questions: questions,
      currentQuestion: questions[getRandomArbitrary(0, questions.length - 1)],
      isOver,
      correctAnswers: totalCorrect,
      selectedOption: ""
    });

    if (_.isEmpty(questions)) {
      const {onComplete = _.noop} = this.props;
      const status = this.state.correctAnswers >= 2 ? 'completed' : 'failed';
      if (isOver) {
        clearTimeout(completedTimer);
        completedTimer = setTimeout(() => {
          onComplete(status);
        }, 3000)
      }
    }
  };

  handleOptionChange = (event) => {
    this.setState({selectedOption: event.target.value})
  };

  removeQuestion = (questionID) => {
    let questions = this.state.questions;
    _.remove(questions, (question) => {
      return question.id === questionID
    });

    return questions;
  };

  render() {
    return (
        <div className='quizWrapper'>
          {!this.state.isOver &&
          <React.Fragment>
            <form>
              <p className='question'>
                {this.state.currentQuestion.question}
              </p>
              {this.state.currentQuestion.options.map((option, index) => {
                return <div className="form-check" key={index}>
                  <input
                      id={option}
                      type="radio"
                      name="react-tips"
                      value={option}
                      className="form-check-input"
                      onChange={this.handleOptionChange}
                      checked={option === this.state.selectedOption}
                      key={index}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              })}
            </form>
            <button onClick={this.handleSubmit}>Submit</button>
          </React.Fragment>
          }
          {this.state.isOver &&
          <h1>you answered {this.state.correctAnswers}/{this.state.count} right</h1>
          }
        </div>

    );
  }
}

export default Qa;

function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


