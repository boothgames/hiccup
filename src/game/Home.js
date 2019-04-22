import React from "react";
import './dashboard.css'
import {connect, publishClientMessage, gameEvent, clientEvent, publishGameMessage} from "../lib/socket";
import {getSelectedGames, getSecurityIncidents} from "../lib/settings";
import Prequel from "./Prequel";
import Instruction from "./Instruction";
import Game from "./Game";
import _ from "lodash";
import Lost from "./Lost";
import Win from "./Win";
import Incident from "./Incident";

const INVALID_GAME = {Name: 'oops', Instruction: 'Contact volunteer'};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: 'prequel', games: {}};
    this.start = this.start.bind(this);
    this.instructionRead = this.instructionRead.bind(this);
    this.hintRead = this.hintRead.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleGameComplete = this.handleGameComplete.bind(this);
    this.handleGameFailed = this.handleGameFailed.bind(this);
    this.handleGameHandover = this.handleGameHandover.bind(this);
  }

  componentDidMount() {
    gameEvent.addListener('start', this.handleStartGame);
    clientEvent.addListener('completed', this.handleGameComplete);
    clientEvent.addListener('failed', this.handleGameFailed);
    const fetch = async () => {
      const games = await getSelectedGames();
      const incidents = await getSecurityIncidents(_.size(games));
      this.setState({incidents, games: games});
    };
    fetch().then(_.noop);
    connect();
  }

  start() {
    this.setState({status: 'intro'})
  }

  instructionRead() {
    publishClientMessage({action: 'start'});
  }

  componentWillUnmount() {
    gameEvent.removeAllListeners('start');
    clientEvent.removeAllListeners('completed');
    clientEvent.removeAllListeners('failed');
  }

  handleStartGame({Name: name}) {
    this.setState({status: 'in-progress', selectedGame: name, incident: {}});
  }

  handleGameComplete({Name: name}) {
    const {games} = this.state;
    _.merge(games, {[name]: {completed: true}});
    const {true: remainingCount = 0} = _.countBy(games, game => !game.completed);
    const status = remainingCount === 0 ? 'completed' : 'in-progress';
    this.setState({games, status});
  }

  handleGameFailed({Name: name}) {
    const {games} = this.state;
    _.merge(games, {[name]: {failed: true}});
    this.setState({games, status: 'failed'});
  }

  handleGameHandover(name, {action}) {
    switch (action) {
      case "completed":
        const {incidents} = this.state;
        const hint = incidents.pop();
        const incident = {name, action, hint};
        this.setState({status: "show-incident", incident});
        return;
      case "failed":
        publishGameMessage(name, {action});
        return;
    }
  }

  hintRead({name, action}) {
    publishGameMessage(name, {action});
  }

  render() {
    const {status, games} = this.state;
    switch (status) {
      case "intro":
        return <Instruction onRead={this.instructionRead} games={games}/>;
      case "in-progress": {
        const {selectedGame: name} = this.state;
        const game = _.get(games, name, INVALID_GAME);
        return <Game game={game} onComplete={this.handleGameHandover}/>
      }
      case "completed":
        return <Win/>;
      case "failed":
        return <Lost/>;
      case "show-incident":
        const {incident} = this.state;
        return <Incident data={incident} onRead={this.hintRead}/>;
      default:
        return <Prequel onStart={this.start}/>;
    }
  };
}