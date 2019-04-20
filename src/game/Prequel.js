import React from "react";
import Page from "../common/Page";
import './dashboard.css'
import _ from 'lodash';
import {countDownTimer} from "../lib/timer";

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

  render() {
    const {status, countDown} = this.state;
    let message;
    switch (status) {
      case "ready":
        message = (<a className="link" onClick={this.kickoff}>Start</a>);
        break;
      case "start":
        message = (<a>{countDown}</a>);
        break;
      case "begin":
        message = (<a className="link" onClick={this.start}>Save the Server</a>);
        break;
      default:
        message = (<a>Welcome</a>);
        break;
    }
    return (
        <Page>
          <div className="gooey">{message}</div>
        </Page>
    );
  };
}