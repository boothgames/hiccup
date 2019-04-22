import {fetch} from "whatwg-fetch";
import {currentSettings} from "./storage";
import _ from "lodash";

export const getRegisteredGames = async () => {
  const req = await fetch('/api/games');
  return req.json()
};

export const getSecurityIncidents = async (count = 3) => {
  const req = await fetch('/api/security-incidents');
  const result = await req.json();
  const incidents = _.map(result, ({Tag: tag, Takeaway: takeaway}) => ({tag, takeaway}));
  return _(incidents).shuffle().take(count).value();
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