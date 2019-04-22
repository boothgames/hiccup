import React from "react";
import Page from "../common/Page";
import './dashboard.css'
import _ from "lodash";
import {countDownTimer} from "../lib/timer";
import ProgressBar from "react-progress-bar-plus";

export default class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {progress: 0};
  }

  componentDidMount() {
    const {onRead = _.noop} = this.props;
    const duration = 5000;
    this.timer = countDownTimer({
      tick: ({ms}) => {
        const progress = 100 - Math.round((((duration - ms) / duration) * 100));
        this.setState({progress});
      },
      completed: onRead,
      duration,
      refresh: 100,
    });
  }

  componentWillUnmount() {
    this.timer.stop();
    this.timer = null;
  }

  render() {
    const {games} = this.props;
    const {progress} = this.state;
    return (
        <Page>
          <div className="gooey-Ex-large">
            <ProgressBar percent={progress} spinner={false}/>
            <h2 className='gameName-info'>Instruction</h2>
            <ul>{_.map(games, ({Name: name, Title: title}) => {
              return (
                  <li key={name}>
                    <span className="dot"/>{title}
                  </li>
              )
            })}
            </ul>
          </div>
        </Page>
    );
  };
}
