import React, { Component } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import _, { orderBy } from 'lodash';
import './dashboard.css';
import PropTypes from 'prop-types';
import joker from '../asserts/img/joker.jpg';
import victory from '../asserts/img/victory2.gif';


class WhySoSerious extends Component {
  constructor(props) {
    super(props);
    this.state = { expression: '' };
    this.webcam = React.createRef();
    this.analyse = this.analyse.bind(this);
  }

  async componentDidMount() {
    await faceapi.loadFaceDetectionModel('models');
    await faceapi.loadFaceExpressionModel('models');
    await faceapi.loadSsdMobilenetv1Model('models');
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  getSuccess() {
    const { onComplete } = this.props;
    setTimeout(() => {
      onComplete('completed');
    }, 5000);

    const { image, oldImage } = this.state;
    return (
      <div className="container">
        <img alt="you won" className="joker" src={victory}/>
        <img alt="happy" className="happy" src={image}/>
        <img alt="not happy" className="nothappy" src={oldImage || image}/>
      </div>
    );
  }

  analyse = async () => {
    this.setState({ expression: '' });
    const image = new Image();
    image.src = this.webcam.getScreenshot();

    const detectionsWithExpressions = await faceapi.detectAllFaces(image).withFaceExpressions();

    if (detectionsWithExpressions && detectionsWithExpressions.length !== 0) {
      const { expression } = orderBy(detectionsWithExpressions[0].expressions, ['probability'], ['desc'])[0];

      this.setState({ image: image.src, expression });
      if (expression !== 'happy') {
        this.setState({ oldImage: image.src });
        await this.analyse();
      }
    }
  };


  startProcess() {
    setTimeout(() => {
      this.analyse();
    }, 1000);
  }

  render() {
    const videoConstraints = {
      width: 350,
      height: 350,
      facingMode: 'user',
    };
    const { expression } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          {expression === 'happy' ? this.getSuccess() : <img alt="joker" className="joker" src={joker}/>}
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            onUserMedia={() => {
              this.startProcess();
            }}
            videoConstraints={videoConstraints}
          />
          <div className="expression">{expression || ''}</div>
          <button type="submit" onClick={this.analyse}>Detect</button>
        </div>
      </div>
    );
  }
}

export default WhySoSerious;

WhySoSerious.propTypes = {
  onComplete: PropTypes.func,
};

WhySoSerious.defaultProps = {
  onComplete: _.noop,
};
