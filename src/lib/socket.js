import _ from 'lodash';
import EventEmitter from 'events';
import { currentSettings } from './storage';

const connections = {};

let clientSocket;

export const gameEvent = new EventEmitter();
export const clientEvent = new EventEmitter();

const wsURL = (path) => {
  const { protocol, host } = window.location;
  return `${((protocol === 'https:') ? 'wss://' : 'ws://')}${host}${path}`;
};

const noop = () => {
};

const configuredGames = () => {
  const { games } = currentSettings();
  return _.chain(games)
    .map(({ name, selected }) => ({ name, selected }))
    .filter('selected')
    .value();
};

const refreshSocket = (socket, { url, onConnected = noop, onMessage = noop }) => {
  if (!socket || !socket.OPEN) {
    const newSocket = new WebSocket(url);
    newSocket.onopen = onConnected;
    newSocket.onmessage = onMessage;
    return newSocket;
  }
  return socket;
};

const clientURL = () => {
  const { nickname = 'hiccup' } = currentSettings();
  return wsURL(`/ws/v1/clients/${nickname}`);
};

const onGameMessage = ({ data }) => {
  const { action, payload } = JSON.parse(data);
  gameEvent.emit(action, payload);
};

const onClientConnected = () => {
  const gameURL = (gameName) => `${clientURL()}/games/${gameName}`;
  const games = configuredGames();
  _.each(games, ({ name }) => {
    const gameSocket = _.get(connections, name);
    connections[name] = refreshSocket(gameSocket, {
      url: gameURL(name),
      onMessage: onGameMessage,
    });
  });
};

const onClientMessage = ({ data }) => {
  const { action, payload } = JSON.parse(data);
  clientEvent.emit(action, payload);
};

export const connect = () => {
  clientSocket = refreshSocket(clientSocket, {
    url: clientURL(),
    onConnected: onClientConnected,
    onMessage: onClientMessage,
  });
};

export const publishClientMessage = (message) => {
  clientSocket.send(JSON.stringify(message));
};

export const publishGameMessage = (id, message) => {
  const socket = _.get(connections, id);
  if (socket) {
    socket.send(JSON.stringify(message));
  }
};