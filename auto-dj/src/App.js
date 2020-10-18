import React from 'react';
import CoolTabs from 'react-cool-tabs';
import './App.css';
import Script from 'react-load-script';



class Video extends React.Component {
  render() {
    return <div>
      this is the webcam video
    </div>
  }
}

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.handleLoadFailure = this.handleLoadSuccess.bind(this);
    this.cb = this.cb.bind(this);
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    };
  }

  handleLoadSuccess() {
    this.setState({ scriptLoaded: true });
    console.log("Script loaded");
    const token = 'BQDtOyZJxO0pfuhx9ReACpZLS8kVhBTH09YJv38ET4wLWpin2YxBsuHCYxWxgM1NumRRdUKb3bkJJZA6yMpPQEZr7eXkd2hmSi5arwQoHi6zgrtGFbPBLcyBPYm5UBfic-47HBjbVFkLT2qtjSrIKklNW8WlWx8xhRLCP0E-WA';
    const player = new window.Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
    console.log(player);

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
  }

  cb(token) {
    return(token);
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
    console.log("Script created");
  }

  handleScriptError() {
    this.setState({ scriptError: true });
    console.log("Script error");
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true});
    console.log("Script loaded");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Script
            url="https://sdk.scdn.co/spotify-player.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
        </header>
      </div>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <CoolTabs
          tabKey={'1'}
          style={{ margin: 0, height: 400, background: 'white' }}
          activeTabStyle={{ background: 'red', color: 'white' }}
          unActiveTabStyle={{ background: 'green', color: 'black' }}
          activeLeftTabBorderBottomStyle={{ background: 'blue', height: 4 }}
          activeRightTabBorderBottomStyle={{ background: 'yellow', height: 4 }}
          tabsBorderBottomStyle={{ background: 'orange', height: 4 }}
          leftContentStyle={{ background: 'lightgreen' }}
          rightContentStyle={{ background: 'lightblue' }}
          leftTabTitle={'Webcam View'}
          rightTabTitle={'Song Player'}
          leftContent={<Video />}
          rightContent={<Song />}
          contentTransitionStyle={'transform 0.6s ease-in'}
          borderTransitionStyle={'all 0.6s ease-in'} />
      </div>
    );
  }
}
