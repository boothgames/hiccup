import React from "react";
import Page from "../common/Page";
import './dashboard.css'
import _ from "lodash";
import {countDownTimer} from "../lib/timer";

export default class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: 'vr',
    }
  }

  componentDidMount() {
    const {onRead = _.noop} = this.props;
    countDownTimer({
      completed: () => {
        onRead();
      },
      duration: 5000
    });
  }

  render() {
    const {games} = this.props;
    return (
        <Page>
          <div className="gooey-Ex-large">
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
