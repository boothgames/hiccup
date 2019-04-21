import {fetch} from "whatwg-fetch";
import {currentSettings} from "./storage";
import _ from "lodash";

export const getRegisteredGames = async () => {
  const req = await fetch('/api/games');
  return req.json()
};

export const getSelectedGames = async () => {
  const registeredGames = await getRegisteredGames();
  const {games} = currentSettings();
  return _.reduce(games, (result, game, name) => {
    const {Selected: selected} = game;
    if (selected) {
      _.merge(result, {[name]: registeredGames[name]});
    }
    return result;
  }, {});
};