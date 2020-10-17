import React from 'react';

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.streamCamVideo = this.streamCamVideo.bind(this)
    }

    streamCamVideo() {
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
    }

    captureImage() {
        var canvas = document.getElementById('canvas');
        var video = document.querySelector('video');

        canvas.width = 1280;
        canvas.height = 720;
        canvas.getContext('2d').drawImage(video, 0, 0, 1280, 720);

        document.getElementById("printresult").innerHTML = canvas.toDataURL();
        console.log(canvas.toDataURL());
    }

    render() {

        const videoContainer = <div>
            <div id="container">
                <video autoPlay={true} id="videoElement" controls></video>
            </div>
            <br />
            <button onClick={this.streamCamVideo}>Start streaming</button>
            {/* <button onClick={this.captureImage}>Take Picture</button> */}
            <canvas id="canvas"></canvas>
            <p> Image Converted to String: </p>
            <p id="printresult"></p>
        </div>

        setInterval(this.captureImage, 30000);

        return videoContainer;
    }
}

export default Video