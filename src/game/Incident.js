import React from "react";
import Page from "../common/Page";
import './dashboard.css'
import _ from "lodash";
import {countDownTimer} from "../lib/timer";
import ProgressBar from "react-progress-bar-plus";
import {Col, Container, Row} from "react-bootstrap";
import ReactMarkdown from "react-markdown";

export default class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {progress: 0};
  }

  componentDidMount() {
    const {onRead = _.noop} = this.props;
    const {data = {}} = this.props;
    const {name, action} = data;
    const duration = 15000;

    this.timer = countDownTimer({
      tick: ({ms}) => {
        const progress = 100 - Math.round((((duration - ms) / duration) * 100));
        this.setState({progress});
      },
      completed: () => onRead({name, action}),
      duration,
      refresh: 100,
    });
  }

  componentWillUnmount() {
    this.timer.stop();
    this.timer = null;
  }

  render() {
    const {progress} = this.state;
    const {data = {hint: {}}} = this.props;
    const {hint: {takeaway = "ask volunteer"}} = data;
    return (
        <Page>
          <ProgressBar percent={progress} spinner={false}/>
          <h1>Did you Know?</h1>
          <Container>
            <Row>
              <Col>
                <div className="hint">
                  <ReactMarkdown source={takeaway}/>
                </div>
              </Col>
            </Row>
          </Container>

        </Page>
    );
  };
}
