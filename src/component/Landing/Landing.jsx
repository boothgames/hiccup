import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <p>Clear the levels to save the server</p>
    <Link to={{ pathname: '/firstgame' }}>two</Link>
  </div>
);

export default Landing;
