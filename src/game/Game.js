import React from 'react';
import Page from '../common/Page';
import {Col, Container, Jumbotron, Row} from 'react-bootstrap';
import {countDownTimer} from "../lib/timer";
import {publishGameMessage} from "../lib/socket";

export default function Game(props) {
  const {game: {Name: name, Instruction: instruction}} = props;

  countDownTimer({
    completed: () => {
      publishGameMessage(name, {action: 'completed'})
    },
    duration: 5000,
  });

  return (
      <Page>
        <h1>{name}</h1>
        <Container>
          <Row>
            <Col>
              <Jumbotron>
                <p>{instruction}</p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </Page>
  );
}