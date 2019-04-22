import React, { Component } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from "react-webcam";
import { orderBy } from 'lodash'
import './dashboard.css';
import joker from '../asserts/img/joker.jpg'

class WhySoSerious extends Component {
    setRef = webcam => {
        this.webcam = webcam;
    };

    constructor(props) {
        super(props);
        this.state = {
            expresion: "",
            timerId: null
        };
        this.webcam = React.createRef();
    }

    analyse = async () => {
        console.log("called", this.webcam);
        this.setState({ expresion: "" });
        const image = new Image();
        image.src = this.webcam.getScreenshot();
        const detectionsWithExpressions = await faceapi.detectAllFaces(image).withFaceExpressions();
        console.log("expressions", detectionsWithExpressions)
        if (detectionsWithExpressions && detectionsWithExpressions.length !== 0) {
            this.setState(
                {
                    image: image.src,
                    expresion: orderBy(detectionsWithExpressions[0].expressions, ['probability'], ['desc'])[0]['expression']
                }
            );
            if (this.state.expresion !== "happy") {
                this.setState({ oldImage: image.src });
            }
        }
    }
    async componentDidMount() {
        await faceapi.loadFaceDetectionModel("models")
        await faceapi.loadFaceExpressionModel("models")
        await faceapi.loadSsdMobilenetv1Model('models')
    }
    startProcess() {
        const timerId = setInterval(() => this.analyse(), 1000);
        this.setState({ timerId });
    }

    getSuccess() {
        clearInterval(this.state.timerId);
        return (
            <div className="container">
                <img alt="you won" className="joker" src="https://media.giphy.com/media/KEVNWkmWm6dm8/giphy.gif" />
                <img alt="happy" className="happy" src={this.state.image} />
                <img alt="not happy" className="nothappy" src={this.state.oldImage} />
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
                    {this.state.expresion === "happy" ? this.getSuccess() : <img alt="joker" className="joker" src={joker} />}
                    <Webcam
                        audio={false}
                        height={350}
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"
                        width={350}
                        onUserMedia={() => { this.startProcess() }}
                        videoConstraints={videoConstraints}
                    />
                    <div className="expression">{this.state.expresion ? this.state.expresion : ""}</div>
                    <button onClick={() => { this.analyse() }} >Detect</button>
                </div>
            </div>
        );
    }
}

export default WhySoSerious;
