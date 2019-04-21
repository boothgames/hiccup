import React from 'react';
import Page from '../common/Page';
import {publishGameMessage} from "../lib/socket";
import External from "./External";
import Embedded from "./Embedded";

let timer;

export default function Game(props) {
  const {game} = props;
  const {Mode: mode, Name: name} = game;

  switch (mode) {
    case "external":
      return <External game={game}/>;
    case "embedded":
      return <Embedded game={game}/>;
    default: {
      clearTimeout(timer);
      timer = setTimeout(() => {
        publishGameMessage(name, {action: 'completed'});
      }, 5000);
      return (
          <Page>
            <h1>oops!!</h1>
          </Page>
      );
    }

  }
}