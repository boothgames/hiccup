import React from 'react';
import Page from '../common/Page';
import './dashboard.css';
import image from '../asserts/img/check-box.png';


const Win = () => {
  return (
    <Page>
      <img src={image} alt='win'/>
      <p className='status-text'>You Win, Server is now secured</p>
    </Page>
  );
};

export default Win;
