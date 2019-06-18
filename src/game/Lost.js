import React from 'react';
import Page from '../common/Page';
import './dashboard.css';
import image from '../asserts/img/strong-warning.png';

const Lost = () => {
  return (
    <Page>
      <img src={image} alt='lost'/>
      <p className='status-text lost'>You Lose, Server is still vulnerable to attack</p>
    </Page>
  );
};

export default Lost;
