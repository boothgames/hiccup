import React from 'react';
import './dashboard.css';
import _ from 'lodash';
import { connect, publishClientMessage, gameEvent, clientEvent, publishGameMessage } from '../lib/socket';
import { getSelectedGames, getHints } from '../lib/settings';
import Prequel from './Prequel';
import Instruction from './Instruction';
import Game from './Game';
import Lost from './Lost';
import Win from './Win';
import NoGame from './NoGame';
import Incident from './Incident';

const INVALID_GAME = { name: 'oops', instruction: 'Contact volunteer' };

export default class Home extends React.Component {
  static instructionRead() {
    publishClientMessage({ action: 'start' });
  }

  static hintRead({ name, action }) {
    publishGameMessage(name, { action });
  }

  constructor(props) {
    super(props);
    this.state = { status: '', games: {} };
    this.start = this.start.bind(this);
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
      const incidents = await getHints(_.size(games));
      var status = _.isEmpty(games) ?  'nogame' : 'prequel';
      this.setState({ incidents, games, status });
    };
    fetch().then(_.noop);
    connect();
  }

  componentWillUnmount() {
    gameEvent.removeAllListeners('start');
    clientEvent.removeAllListeners('completed');
    clientEvent.removeAllListeners('failed');
  }

  start() {
    this.setState({ status: 'intro' });
  }


  handleStartGame({ name }) {
    this.setState({ status: 'in-progress', selectedGame: name, incident: {} });
  }

  handleGameComplete({ name }) {
    const { games } = this.state;
    _.merge(games, { [name]: { completed: true } });
    const { true: remainingCount = 0 } = _.countBy(games, game => !game.completed);
    const status = remainingCount === 0 ? 'completed' : 'in-progress';
    this.setState({ games, status });
  }

  handleGameFailed({ name }) {
    const { games } = this.state;
    _.merge(games, { [name]: { failed: true } });
    this.setState({ games, status: 'failed' });
  }

  handleGameHandover(name, { action }) {
    const { incidents } = this.state;
    const hint = incidents.pop() || {};
    const incident = { name, action, hint };

    switch (action) {
      case 'completed':
        this.setState({ status: 'show-incident', incident });
        return;
      case 'failed':
        publishGameMessage(name, { action });
        return;
      default:
        publishGameMessage(name, { action });

    }
  }


  render() {
    const { status, games, incident } = this.state;
    const { selectedGame: name } = this.state;
    const game = _.get(games, name, INVALID_GAME);

    switch (status) {
      case 'intro':
        return <Instruction onRead={Home.instructionRead} games={games}/>;
      case 'in-progress':
        return <Game game={game} onComplete={this.handleGameHandover}/>;
      case 'completed':
        return <Win/>;
      case 'failed':
        return <Lost/>;
      case 'nogame':
        return <NoGame/>
      case 'show-incident':
        return <Incident data={incident} onRead={Home.hintRead}/>;
      case 'prequel':
        return <Prequel onStart={this.start}/>;
      default:
        return <div></div>
    }
  };
}