import React, {Component} from 'react';
import {QaModel} from "./qa/QaModel";
import {ListGroup} from "react-bootstrap";
import {Button} from "react-bootstrap";
import _ from "lodash";
import QS from "./Questionaire";
import Page from '../common/Page';

class Qa extends Component {
    constructor(props, context) {
        super(props, context);
        let qas = [];
        let shuffledQuestions = _.shuffle(QS.questions);

        _.each(shuffledQuestions.slice(1, 10), (question) => {
            qas.push(new QaModel(question.id, question.question, question.options, question.answer))
        });

        this.state = {
            questions: qas,
            currentQuestion: qas[getRandomArbitrary(0, qas.length - 1)],
            selectedOption: "",
            isOver: false,
            correctAnswers: 0
        };
    }

    handleSubmit = () => {
        if (!this.state.selectedOption) {
            return
        }

        let totalCorrect = this.state.correctAnswers

        if (this.state.selectedOption === this.state.currentQuestion.answer) {
            totalCorrect++
        }

        let questions = this.removeQuestion(this.state.currentQuestion.id);
        this.setState({
            questions: questions,
            currentQuestion: questions[getRandomArbitrary(0, questions.length - 1)],
            isOver: _.isEmpty(questions),
            correctAnswers: totalCorrect,
            selectedOption: ""
        })
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
            <Page>
                {!this.state.isOver &&
                <div>
                    <form>
                        <ListGroup.Item active>
                            {this.state.currentQuestion.question}
                        </ListGroup.Item>
                        {this.state.currentQuestion.options.map((option) => {
                            return <div className="form-check">
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value={option}
                                    className="form-check-input"
                                    onChange={this.handleOptionChange}
                                    checked={option === this.state.selectedOption}
                                />
                                {option}
                            </div>
                        })}
                    </form>
                    <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                </div>
                }
                {this.state.isOver &&
                <h1> Game over! {this.state.correctAnswers} + {this.state.questions.length}</h1>
                }
            </Page>

        );
    }
}

export default Qa;

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


