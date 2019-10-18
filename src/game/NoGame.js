import React from 'react';
import Page from '../common/Page';
import './dashboard.css';
import image from '../asserts/img/strong-warning.png';

const NoGame = () => {
  return (
    <Page>
      <img src={image} alt='lost'/>
      <p className='status-text lost'>Games are not loaded yet, Contact Volunteer</p>
    </Page>
  );
};

export default NoGame;
