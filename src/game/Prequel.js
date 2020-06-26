import React from 'react';
import _ from 'lodash';
import { Col, Container, Row } from 'react-bootstrap';
import './dashboard.css';
import PropTypes from 'prop-types';
import Page from '../common/Page';
import Shop from './embedded/Shop/Shop';
import { ImagesProvider } from "./contexts/ImagesContext";
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'

export default class Prequel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: 'ready' };
    this.start = this.start.bind(this);
    this.kickoff = this.kickoff.bind(this);
  }

  start() {
    const { onStart } = this.props;
    onStart();
  }

  kickoff() {
    this.setState({ status: 'start' });
  }

  renderMessage() {
    const { status, countDown } = this.state;
    switch (status) {
      case 'ready':
        return (
          <Page>
            <div class='logo'>
              <img src='https://www.thoughtworks.com/imgs/tw-logo.svg' />
            </div>
            <img src="https://dynamic.thoughtworks.com/landing_pages/hero_banner_image_desktop-665554b185264f7ef2da169a815ab300.jpeg" />
            <div class='Thoughtworks-microsi'>
              <Navbar expand="lg" variant="light" bg="light" >
                <Navbar.Brand href="https://www.thoughtworks.com/arts">&lt;  Thoughtworks microsite page
              </Navbar.Brand>
              </Navbar>
            </div>
            <Container>
              <h1 class='Lets-play'> Let's play!</h1>
              <div class='play-game-box'>
                <Container >
                  <div class='game-preview'>
                    <img class='preview-image' src={require('./screen2.png')} />
                  </div>
                  <div class='Level-1-Instructions'>
                    <p class='text-style-1'>Level 1 Instructions:</p>
                    <p>
                      - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                      - Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      - Third instruciton
                  </p>
                  </div>
                </Container>
              </div>
            </Container>
            <div onClick={this.kickoff}>
            </div>
          </Page >
        );
      case 'start':
        return <ImagesProvider
          r={require.context(
            "./embedded/Shop/images/",
            true,
            /\.(png|jpe?g|svg)$/
          )}
        > <Shop onComplete={this.handleComplete} /> </ImagesProvider>;
      case 'begin':
        return (
          <Page>
            <Container>
              <Row>
                <Col>
                  <div className="save-the-server">
                    <p>
                      You are in a world that runs on
                      <strong> Open Source Software.</strong>
                      {' '}
                      But there are forces
                      beyond reason, that
                      are constantly threatening the ways of the internet.
                      {' '}
                    </p>
                    <p>
                      As you’re reading this,
                      <strong> hackers</strong>
                      {' '}
                      are breaking
                      into your most-dependable open source web server.
                      {' '}
                    </p>
                    <p>
                      The future of internet is in
                      <strong> your hands</strong>
                      {' '}
                      right now. Complete all levels of the
                      challenge and save the day!
                    </p>
                    <div className="action">
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a className="link" onClick={this.start}>Save the Server</a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>

          </Page>
        );
      default:
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return (<a>Welcome</a>);
    }
  }

  render() {
    return this.renderMessage();
  };
}

Prequel.propTypes = {
  onStart: PropTypes.func,
};

Prequel.defaultProps = {
  onStart: _.noop,
};