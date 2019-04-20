import React from "react";
import Page from "../common/Page";
import './dashboard.css'

export default class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: 'vr',
    }
  }

  render() {
    return (
        <Page>
          <div className="gooey-Ex-large">
            <h2 className='gameName-info'>Name of the game</h2>
            <ul>
              <li><span className="dot"></span> some info</li>
              <li><span className="dot"></span> some info</li>
            </ul>
          </div>
        </Page>
    );
  };
}
