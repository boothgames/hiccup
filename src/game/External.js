import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PinInput from 'react-pin-input';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Page from '../common/Page';

export default class External extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.complete = this.complete.bind(this);
  }

  complete(value) {
    const { game: { name, metadata: { codes } }, onComplete } = this.props;
    const action = _.includes(codes, Number(value)) ? 'completed' : 'failed';
    onComplete(name, { action });
  }

  render() {
    const { game: { title, instruction } } = this.props;
    return (
      <Page>
        <h1>{title}</h1>
        <Container>
          <Row>
            <div>
              <h2>How to Play?</h2>
              <div className="hint">
                <ReactMarkdown source={instruction}/>
              </div>

            </div>
            <Col md={{ span: 6, offset: 3 }}>
              <div className="code">
                <PinInput
                  length={4}
                  type="numeric"
                  ref={(ele) => {
                    if (ele) {
                      ele.clear();
                      ele.focus();
                    }
                  }}
                  onComplete={this.complete}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}

External.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    metadata: PropTypes.object,
  }).isRequired,
  onComplete: PropTypes.func,
};

External.defaultProps = {
  onComplete: _.noop,
};