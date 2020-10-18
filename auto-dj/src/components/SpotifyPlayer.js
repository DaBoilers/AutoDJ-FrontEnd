import React from 'react';
import Button from 'react-bootstrap/Button';

class SpotifyPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "BQBYCQVFJyvIIwTD2xd5XyMbJcEutMn35e9R4xr8WI6m_Jmd5SuhLrDWRC_sdG7i38PitES_5ru5to1Z2ziIrUFfCJhx2pi6ABsUToysZtPnZOh74EvsfnjLGmFp8UlzjJkwR92Zr6Ber81gsKNEadyTrlrZnj5iy_JyGyDskA",
            deviceId: "",
            loggedIn: true,
            error: "",
            trackName: "Track Name",
            artistName: "Artist Name",
            albumName: "Album Name",
            playing: false,
            position: 0,
            duration: 0
        };
        this.playerCheckInterval = null;
    }

    checkForPlayer() {
        const { token } = this.state;

        if (window.Spotify !== null) {
            clearInterval(this.playerCheckInterval);
            this.player = new window.Spotify.Player({
                name: "AutoDJ",
                getOAuthToken: cb => { cb(token); },
            });
            this.createEventHandlers();

            this.player.connect();
        }
    }

    createEventHandlers() {
        this.player.on('initialization_error', e => { console.error(e); });
        this.player.on('authentication_error', e => {
            console.error(e);
            this.setState({ loggedIn: false });
        });
        this.player.on('account_error', e => { console.error(e); });
        this.player.on('playback_error', e => { console.error(e); });

        // Playback status updates
        this.player.on('player_state_changed', state => { console.log(state); });

        // Ready
        this.player.on('ready', data => {
            let { device_id } = data;
            console.log("Let the music play on!");
            this.setState({ deviceId: device_id });
            this.TransferPlaybackHere();
        });
    }

    TransferPlaybackHere() {
        const { deviceId, token } = this.state;
        // https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
        fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "device_ids": [deviceId],
                // true: start playing music if it was paused on the other device
                // false: paused if paused on other device, start playing music otherwise
                "play": true,
            }),
        });
    }

    onToggle() {
        this.player.togglePlay();
    }

    render() {
        this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);

        authScreen = <div className="App">
            <header className="App-header">
                <Button id="btn" onClick={this.onToggle.bind(this)}> {this.state.playing ? "Pause" : "Play"} </Button>
            </header>
        </div>

        mediaPlayerScreen = <div className="App">
            <header className="App-header">
                <Button id="btn" onClick={this.onToggle.bind(this)}> {this.state.playing ? "Pause" : "Play"} </Button>
            </header>
        </div>

        return (
            { this.state.loggedIn ? mediaPlayerScreen : authScreen }
        );
    }
}

export default SpotifyPlayer;