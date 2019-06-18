import React from 'react';
import './dashboard.css';
import _ from 'lodash';
import ProgressBar from 'react-progress-bar-plus';
import { Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import countDownTimer from '../lib/timer';
import Page from '../common/Page';

export default class Incident extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0 };
  }

  componentDidMount() {
    const { onRead } = this.props;
    const { data = {} } = this.props;
    const { name, action } = data;
    const duration = 15000;

    this.timer = countDownTimer({
      tick: ({ ms }) => {
        const progress = 100 - Math.round((((duration - ms) / duration) * 100));
        this.setState({ progress });
      },
      completed: () => onRead({ name, action }),
      duration,
      refresh: 100,
    });
  }

  componentWillUnmount() {
    this.timer.stop();
    this.timer = null;
  }

  render() {
    const { progress } = this.state;
    const { data = { hint: {} } } = this.props;
    const { hint: { takeaway = 'ask volunteer' } } = data;
    return (
      <Page>
        <ProgressBar percent={progress} spinner="right"/>
        <h1>Did you Know?</h1>
        <Container>
          <Row>
            <Col>
              <div className="hint did-you-know">
                <ReactMarkdown source={takeaway}/>
              </div>
            </Col>
          </Row>
        </Container>

      </Page>
    );
  };
}

Incident.propTypes = {
  data: PropTypes.shape({
    hint: PropTypes.object,
  }).isRequired,
  onRead: PropTypes.func,
};

Incident.defaultProps = {
  onRead: _.noop,
};
