import {fetch} from "whatwg-fetch";

export const getRegisteredGames = async () => {
  const req = await fetch('/api/games');
  return req.json()
};