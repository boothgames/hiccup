import React from "react";
import Page from "../common/Page";
import './dashboard.css'
import image from '../asserts/img/strong-warning.png'

export default class Lost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: 'vr',
    }
  }

  render() {
    return (
        <Page>
          <img src={image} alt='lost'/>
          <p className='status-text lost'>You Lose</p>
        </Page>
    );
  };
}
