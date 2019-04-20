import React from "react";
import Page from "../common/Page";
import './dashboard.css'
import Title from "../common/Title";
import {connect, publishClientMessage, gameEvent} from "../lib/socket";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: 'ready'};
    this.start = this.start.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
  }

  componentDidMount() {
    gameEvent.addListener('start', this.handleStartGame);
    connect();
  }

  componentWillUnmount() {
    gameEvent.removeAllListeners('start');
  }

  handleStartGame(event) {
    console.log(event);
  }

  start() {
    publishClientMessage({action: 'start'});
  }

  render() {
    return (
        <Page>
          <Title/>
          <div className="gooey">
            <a className="link" onClick={this.start}>Start</a>
          </div>
        </Page>
    );
  };
}