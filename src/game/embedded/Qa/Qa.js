import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Model from './model';
import './Qa.css';

let completedTimer;

const getRandomArbitrary = (min, max) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

class Qa extends Component {
  constructor(props, context) {
    super(props, context);
    const qas = [];
    const shuffledQuestions = _.shuffle(props.options);

    _.each(shuffledQuestions.slice(1, 4), (question) => {
      qas.push(new Model(question.id, question.question, question.options, question.answer));
    });

    this.state = {
      questions: qas,
      currentQuestion: qas[getRandomArbitrary(0, qas.length - 1)],
      selectedOption: '',
      isOver: false,
      correctAnswers: 0,
      count: qas.length,
    };
  }

  handleSubmit = () => {
    const {selectedOption, currentQuestion: {answer, id}} = this.state;
    let {correctAnswers} = this.state;
    if (!selectedOption) {
      return;
    }

    if (selectedOption === answer) {
      correctAnswers += 1;
    }

    const questions = this.removeQuestion(id);
    const isOver = _.isEmpty(questions);

    this.setState({
      questions,
      currentQuestion: questions[getRandomArbitrary(0, questions.length - 1)],
      isOver,
      correctAnswers,
      selectedOption: '',
    });

    if (_.isEmpty(questions)) {
      const { onComplete = _.noop } = this.props;
      if (isOver) {
        const status = correctAnswers >= 2 ? 'completed' : 'failed';
        clearTimeout(completedTimer);
        completedTimer = setTimeout(() => {
          onComplete(status);
        }, 3000);
      }
    }
  };

  handleOptionChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  removeQuestion = (questionID) => {
    const { questions } = this.state;
    _.remove(questions, (question) => {
      return question.id === questionID;
    });

    return questions;
  };

  render() {
    const { isOver, currentQuestion = {}, selectedOption, correctAnswers, count } = this.state;
    const { question, options } = currentQuestion || {};
    return (
      <div className='quizWrapper'>
        {!isOver && (
          <React.Fragment>
            <form>
              <p className='question'>
                {question}
              </p>
              {options.map((option) => {
                return (
                  <div className="form-check" key={option}>
                    <input
                      id={option}
                      type="radio"
                      name="react-tips"
                      value={option}
                      className="form-check-input"
                      onChange={this.handleOptionChange}
                      checked={option === selectedOption}
                      key={option}
                    />
                    {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                    <label htmlFor={option}>
                      {option}
                    </label>
                  </div>
                );
              })}
            </form>
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </React.Fragment>
        )}
        {isOver && (
          <h1>
            you answered
            {correctAnswers}
            /
            {count}
            {' '}
            right
          </h1>
        )}
      </div>
    );
  }
}

Qa.propTypes = {
  onComplete: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
};

Qa.defaultProps = {
  onComplete: _.noop,
};

export default Qa;


