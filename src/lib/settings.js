import { fetch } from 'whatwg-fetch';
import _ from 'lodash';
import { currentSettings } from './storage';

export const getRegisteredGames = async () => {
  const req = await fetch('/api/games');
  return req.json();
};

export const getHints = async (count = 3) => {
  const req = await fetch('/api/hints');
  const result = await req.json();
  const incidents = _.map(result, ({ tag, takeaway }) => ({ tag, takeaway }));
  return _(incidents).shuffle().take(count).value();
};

export const getSelectedGames = async () => {
  const registeredGames = await getRegisteredGames();
  const { games = {} } = currentSettings();
  return _.reduce(games, (result, game, name) => {
    const { selected } = game;
    if (selected) {
      _.merge(result, { [name]: registeredGames[name] });
    }
    return result;
  }, {});
};