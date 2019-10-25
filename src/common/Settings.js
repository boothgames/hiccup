import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import Page from './Page';
import { getRegisteredGames } from '../lib/settings';
import { currentSettings, saveSettings } from '../lib/storage';

class Settings extends Component {
  constructor(props) {
    super(props);
    const { games = {}, nickname = '' } = currentSettings() || {};
    this.state = { games, nickname };
    this.handleSave = this.handleSave.bind(this);
    this.updateNickname = this.updateNickname.bind(this);
    this.toggleGame = this.toggleGame.bind(this);
  }

  componentDidMount() {
    const { games } = this.state;
    getRegisteredGames().then(registeredGames => {
      const mappedGames = _.reduce(registeredGames, (result, value, name) => {
        _.merge(result, { [name]: _.pick(value, ['name', 'title']) });
        return result;
      }, {});
      _.merge(games, mappedGames);
      this.setState({ games });
    });
  }

  handleSave(event) {
    const { games, nickname } = this.state;
    const {history} = this.props;
    saveSettings({ games, nickname });
    event.preventDefault();
    history.push("/");
  }

  updateNickname({ target: { value: nickname } }) {
    this.setState({ nickname });
  }

  toggleGame({ target: { name, checked } }) {
    const { games } = this.state;
    const game = { [name]: { selected: checked } };
    _.merge(games, game);
    this.setState({ games });
  }

  render() {
    const { games = {}, nickname = '' } = this.state;
    return (
      <Page>
        <h1>Settings</h1>
        <Container>
          <Row>
            <Col>
              <Formik enableReinitialize initialValues={{ games, nickname }}>
                {({ values: { nickname: clientName, games: selectedGames = {} } }) => (
                  <Form onSubmit={this.handleSave}>
                    <Form.Group>
                      <Form.Control
                        required
                        type="text"
                        placeholder="nickname"
                        value={clientName}
                        id="nickname"
                        onChange={this.updateNickname}
                      />
                    </Form.Group>
                    {_.map(games, ({ name, title }) => {
                        const { selected = false } = selectedGames[name] || {};
                        return (
                          <Form.Group key={name} controlId={`formGroup${name}`}>
                            <Form.Check
                              name={name}
                              type="checkbox"
                              defaultChecked={selected}
                              label={title}
                              onChange={this.toggleGame}
                              id={name}
                            />
                          </Form.Group>
                        );
                      },
                    )}
                    <Button variant="primary" type="submit">Save</Button>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withRouter(Settings);