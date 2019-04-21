import * as React from "react";
import Page from "../common/Page";

export default class Embedded extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {game} = this.props;
    return (
        <Page>
          <div className="gooey">Embedded: {game.Title}</div>
        </Page>
    )
  }
}