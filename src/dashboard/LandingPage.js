import React from "react";
import Page from "../common/Page";
import './dashboard.css'
import Title from "../common/Title";

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: 'vr',
    }
  }

  render() {
    return (
        <Page>
          <Title/>
          <div className="gooey">
            <a>Start</a>
          </div>
        </Page>
    );
  };
}
