import React from "react";
import { Link } from "react-router-dom";
import Page from "../common/Page";
import './landing.css'

export default class LandingPage extends React.Component {
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
        <div className="gooey">
          <Link
            to={{
              pathname: `/${this.state.game}`,
              state: { prev: true }
            }}>
            Ready
      </Link>
        </div>
      </Page>
    );
  };
}
