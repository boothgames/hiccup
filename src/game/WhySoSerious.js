import React, {Component} from 'react';
import * as faceapi from 'face-api.js';
import Webcam from "react-webcam";
import {orderBy} from 'lodash'
import './dashboard.css';
import joker from '../asserts/img/joker.jpg'
import victory from '../asserts/img/victory2.gif'

class WhySoSerious extends Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  constructor(props) {
    super(props);
    this.state = {
      expression: "",
      timerId: null
    };
    this.webcam = React.createRef();
  }

  analyse = async () => {
    console.log("called", this.webcam);
    this.setState({expression: ""});
    const image = new Image();
    image.src = this.webcam.getScreenshot();
    const detectionsWithExpressions = await faceapi.detectAllFaces(image).withFaceExpressions();
    console.log("expressions", detectionsWithExpressions);
    if (detectionsWithExpressions && detectionsWithExpressions.length !== 0) {
      const expression = orderBy(detectionsWithExpressions[0].expressions, ['probability'], ['desc'])[0]['expression'];
      console.log("expression", expression);
      this.setState(
          {
            image: image.src,
            expression
          }
      );
      if (expression !== "happy") {
        this.setState({oldImage: image.src});
        this.analyse();
      }
    }
  };

  async componentDidMount() {
    await faceapi.loadFaceDetectionModel("models");
    await faceapi.loadFaceExpressionModel("models");
    await faceapi.loadSsdMobilenetv1Model('models')
  }

  startProcess() {
    setTimeout(() => {
      this.analyse();
    }, 1000);
  }

  getSuccess() {
    setTimeout(() => {
      this.props.onComplete("completed");
    }, 5000);
    return (
        <div className="container">
          <img alt="you won" className="joker" src={victory}/>
          <img alt="happy" className="happy" src={this.state.image}/>
          <img alt="not happy" className="nothappy" src={this.state.oldImage ? this.state.oldImage : this.state.image}/>
        </div>
    )
  }

  render() {
    const videoConstraints = {
      width: 350,
      height: 350,
      facingMode: 'user',
    };
    return (
        <div className="App">
          <div className="App-header">
            {this.state.expression === "happy" ? this.getSuccess() : <img alt="joker" className="joker" src={joker}/>}
            <Webcam
                audio={false}
                height={350}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={350}
                onUserMedia={() => {
                  this.startProcess()
                }}
                videoConstraints={videoConstraints}
            />
            <div className="expression">{this.state.expression ? this.state.expression : ""}</div>
            <button onClick={() => {
              this.analyse()
            }}>Detect
            </button>
          </div>
        </div>
    );
  }
}

export default WhySoSerious;
