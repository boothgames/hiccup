import React from "react";
import Page from "../common/Page";
import './dashboard.css'
import _ from 'lodash';
import {countDownTimer} from "../lib/timer";
import {Col, Container, Row} from "react-bootstrap";

export default class Prequel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: 'ready'};
    this.start = this.start.bind(this);
    this.kickoff = this.kickoff.bind(this);
  }

  start() {
    const {onStart = _.noop} = this.props;
    onStart();
  }

  kickoff() {
    countDownTimer({
      tick: () => {
        const {countDown} = this.state;
        this.setState({countDown: countDown - 1});
      },
      completed: () => {
        this.setState({countDown: 0, status: 'begin'});
      },
    });
    this.setState({status: 'start', countDown: 3});
  }

  renderMessage() {
    const {status, countDown} = this.state;
    switch (status) {
      case "ready":
        return (
            <Page>
              <div className="gooey">
                <a className="link" onClick={this.kickoff}>Start</a>
              </div>
            </Page>
        );
      case "start":
        return (
            <Page>
              <div className="gooey">
                <a>{countDown}</a>
              </div>
            </Page>
        );
      case "begin":
        return (
            <Page>
              <Container>
                <Row>
                  <Col>
                    <div className="save-the-server">
                      <p>You are in a world that runs on <strong>Open Source Software.</strong> But there are forces beyond reason, that
                        are constantly threatening the ways of the internet. </p>
                      <p>As you’re reading this, hackers are breaking
                        into your most-dependable open source server. </p>
                      <p>The future of internet is in your hands right now.
                        Complete all levels of the challenge and save the day!</p>
                    </div>
                  </Col>
                </Row>
              </Container>
              <div className="gooey">
                <a className="link" onClick={this.start}>Save the Server</a>
              </div>
            </Page>
        );
      default:
        return (<a>Welcome</a>);
    }
  }

  render() {
    return this.renderMessage();
  };
}