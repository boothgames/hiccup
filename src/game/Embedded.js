import * as React from "react";
import Page from "../common/Page";
import Qa from '../games/Qa';

export default class Embedded extends React.Component {

  render() {
    const {game} = this.props;
    return (
        <Page>
          <h1>{game.Title}</h1>   
          {game.Name === 'quiz' && <Qa options={game.Metadata.questions} />}
        </Page>
    )
  }
}