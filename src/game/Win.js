import React from "react";
import Page from "../common/Page";
import './dashboard.css'
import image from '../asserts/img/check-box.png'

export default class Win extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: 'vr',
    }
  }

  render() {
    return (
        <Page>
          <img src={image} alt='win'/>
          <p className='status-text'>You Win, Server is now secured</p>
        </Page>
    );
  };
}
