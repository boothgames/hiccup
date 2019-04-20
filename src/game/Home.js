import React from "react";
import './dashboard.css'
import {connect, publishClientMessage, gameEvent, clientEvent} from "../lib/socket";
import {getRegisteredGames} from "../lib/settings";
import Prequel from "./Prequel";
import Instruction from "./Instruction";
import Game from "./Game";
import _ from "lodash";
import Lost from "./Lost";
import Win from "./Win";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: 'prequel', games: {}};
    this.start = this.start.bind(this);
    this.instructionRead = this.instructionRead.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleGameComplete = this.handleGameComplete.bind(this);
    this.handleGameFailed = this.handleGameFailed.bind(this);
  }

  componentDidMount() {
    gameEvent.addListener('start', this.handleStartGame);
    clientEvent.addListener('completed', this.handleGameComplete);
    clientEvent.addListener('failed', this.handleGameFailed);
    getRegisteredGames().then(registeredGames => {
      this.setState({games: registeredGames})
    });
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
    this.setState({status: 'in-progress', selectedGame: name});
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

  render() {
    const {status, games} = this.state;
    switch (status) {
      case "intro":
        return <Instruction onRead={this.instructionRead} games={games}/>;
      case "in-progress": {
        const {selectedGame: name} = this.state;
        return <Game game={_.get(games, name, {Name: 'oops', Instruction: 'Contact volunteer'})}/>
      }
      case "completed":
        return <Win/>;
      case "failed":
        return <Lost/>;
      default:
        return <Prequel onStart={this.start}/>;
    }
  };
}