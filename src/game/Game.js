import React from 'react';
import _ from "lodash";
import Page from '../common/Page';
import External from "./External";
import Embedded from "./Embedded";

let timer;

export default function Game(props) {
  const {game, onComplete = _.noop} = props;
  const {mode, name} = game;

  switch (mode) {
    case "external":
      return <External game={game} onComplete={onComplete} />;
    case "embedded":
      return <Embedded game={game} onComplete={onComplete} />;
    default: {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onComplete(name, {action: 'completed'});
      }, 5000);
      return (
        <Page>
          <h1>oops!!</h1>
        </Page>
      );
    }

  }
}