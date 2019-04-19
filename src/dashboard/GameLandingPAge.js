import React from "react";
import Page from "../common/Page";
import './dashboard.css'

export default class GameLandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: 'vr',
    }
  }
  render() {
    return (
      <Page>
      <h1>Dare to be extraordinary ?</h1>
        <div className="gooey gooey-large">
          <p className='gameName'>Name of the game</p>
        </div>
      </Page>
    );
  };
}
