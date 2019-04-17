import React from 'react';
import { Link } from 'react-router-dom';

const FirstGame = () => (
  <React.Fragment>
    <p>Clear the levels to save the server</p>
    <Link to={{ pathname: '/secondgame' }}>Play</Link>
    <Link to={{ pathname: '/' }}>back</Link>
  </React.Fragment>
);

export default FirstGame;
