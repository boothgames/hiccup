import React from 'react';
import Page from '../common/Page';
import { Col, Container, Row } from 'react-bootstrap';
import Qa from '../games/Qa';

export default function GameEmbedded(props) {
  const { game: { Name: name, Instruction: instruction } } = props;

  // countDownTimer({
  //   completed: () => {
  //     publishGameMessage(name, {action: 'completed'})
  //   },
  //   duration: 10000,
  // });

  return (
    <Page>
      <h1>{name}</h1>
      <Container>
        <Row>
          <Col>
            <p>{instruction}</p>
            {name === 'quiz' && <Qa options={props.game.Metadata.questions} />}
          </Col>
        </Row>
      </Container>
    </Page>
  );
}