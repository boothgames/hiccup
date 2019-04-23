import * as React from "react";
import Page from "../common/Page";
import Qa from '../games/Qa';
import WhySoSerious from "./WhySoSerious";
import _ from "lodash";
import Snakes from "../games/Snakes";

export default class Embedded extends React.Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(status) {
    const { game: { Name: name }, onComplete = _.noop } = this.props;
    onComplete(name, { action: status });
  }

  renderGame() {
    const { game: { Name: name, Metadata: metadata = {} } } = this.props;
    switch (name) {
      case "quiz":
        const { questions = [] } = metadata;
        return <Qa options={questions} onComplete={this.handleComplete} />;
      case "smile":
        return <WhySoSerious onComplete={this.handleComplete} />;
      case "snakes":
        return <Snakes onComplete={this.handleComplete} />;
      default:
        return <h1>Call volunteer</h1>;
    }
  }

  render() {
    const { game: { Title: title } } = this.props;
    return (
      <Page>
        <h1>{title}</h1>
        {this.renderGame()}
      </Page>
    )
  }
}