import React from 'react';
import Video from "./Webcam.js"
import CoolTabs from 'react-cool-tabs';

// video is now in separate js file.

class Song extends React.Component {
  render() {
    return <div>
      this is the song player
    </div>
  }
}

export default class App extends React.Component {
  render() {
    const mystyle = {
      margin: 0,
      width: "700",
      height: 900,
      border: "3px solid green",
      overflow: 'hidden',
      background: 'white'
    };
    return (
      <div>
        <CoolTabs
          tabKey={'1'}
          style={mystyle}
          activeTabStyle={{ background: '#3f8a53', color: 'white' }}
          unActiveTabStyle={{ background: '#90f5ab', color: 'black' }}
          activeLeftTabBorderBottomStyle={{ background: '#000000', height: 4 }}
          activeRightTabBorderBottomStyle={{ background: '#000000', height: 4 }}
          tabsBorderBottomStyle={{ background: '#efff3b', height: 4 }}
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
