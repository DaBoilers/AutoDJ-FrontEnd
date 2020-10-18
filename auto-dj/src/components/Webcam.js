import React from 'react';
import Button from 'react-bootstrap/Button';
import './Webcam.css'

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streaming: false
        }
        this.streamCamVideo = this.streamCamVideo.bind(this);
        this.base64ImageString = "image";
    }

    streamCamVideo() {
        if (this.state.streaming) return;
        // DEAF DJ!
        var constraints = { audio: false, video: { width: 1280, height: 720 } };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (mediaStream) {
                var video = document.querySelector("video");

                video.srcObject = mediaStream;
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            }); // always check for errors at the end.

        this.state.streaming = true;
    }

    stopCamVideo() {
        if (!this.state.streaming) return;
        document.querySelector("video").srcObject = null;
        this.state.streaming = false;
    }


    async captureImage() {
        var canvas = document.getElementById('canvas');
        var video = document.querySelector('video');

        canvas.width = 1280;
        canvas.height = 720;
        canvas.getContext('2d').drawImage(video, 0, 0, 1280, 720);
        this.base64ImageString = canvas.toDataURL();

        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "content": this.base64ImageString })
        }

        /* Will change once we deploy somewhere */
        await fetch("http://localhost:5000/user_image", postOptions);
    }

    render() {

        const videoContainer = <div>
            <div id="container">
                <div id="video-container">
                    <video autoPlay={true} id="video-element" controls poster={require("../static/idle.png")} />
                </div>
                <div>
                    <Button id="btn" onClick={this.streamCamVideo.bind(this)}> Start streaming</Button>
                    <Button id="btn" onClick={this.stopCamVideo.bind(this)} variant="danger"> Stop streaming</Button>
                </div>
            </div>
            <br />
            <canvas id="canvas" display="none"></canvas>
        </div>

        setInterval(this.captureImage, 30000);

        return videoContainer;
    }
}

export default Video