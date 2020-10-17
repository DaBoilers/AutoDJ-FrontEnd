import React from 'react';
import CoolTabs from 'react-cool-tabs';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import './App.css';

class Video extends React.Component {
  render() {
    return <div>
      this is the webcam video
    </div>
  }
}

class Song extends React.Component {
  render() {
    return (
    <SpotifyWebPlayer
      showSaveIcon
      syncExternalDevice
      autoPlay={false}
      token={"BQCKan0F85uv4mD3kPfRqIABFzNi3yzGLh5BJ3m3rK1oqJEFqNPcPW_-jvwu5_4YLN0ib6Stpb9GYCd9mqTc0DtlzX8o7ILyUc84DFWJ8STBeKXjsegHjvTMlKhLVH731RlSJTguPYpcXcQl7xa5toduRxKMuB_LYCffMA-vLQ"}
      uris={[
        "spotify:track:2ViHeieFA3iPmsBya2NDFl",
        "spotify:track:5zq709Rk69kjzCDdNthSbK",
        "spotify:track:4iEieBoCRNCpi2YcAfQHYS",
        "spotify:track:1GeutBjnPeNzmixHjvyrq7",
        "spotify:track:4BHkTresnxvVZSyIZU2Kcg",
        "spotify:track:3xIUJZUa8l2pcqJHW9xUnK",
        "spotify:track:0RFcbGAZ0CDIqffkQTCKa8",
        "spotify:track:71iRwikoDrym0amiXnEg3e"
      ].join(",")}
    />);
    
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
