import * as React from "react";
import Page from "../common/Page";
import Qa from '../games/Qa';
import {publishGameMessage} from "../lib/socket";

export default class Embedded extends React.Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(status) {
    const {game: {Name: name}} = this.props;
    publishGameMessage(name, {action: status});
  }

  renderGame() {
    const {game: {Name: name, Metadata: metadata = {}}} = this.props;
    switch (name) {
      case "quiz":
        const {questions = []} = metadata;
        return <Qa options={questions} onComplete={this.handleComplete}/>;
      case "small":
        return <h1>Why so serious</h1>;
      default:
        return <h1>Call volunteer</h1>;
    }
  }

  render() {
    const {game: {Title: title}} = this.props;
    return (
        <Page>
          <h1>{title}</h1>
          {this.renderGame()}
        </Page>
    )
  }
}