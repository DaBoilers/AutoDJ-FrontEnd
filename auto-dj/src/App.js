import React from 'react';
import Video from "./components/Webcam.js"
import SpotifyPlayer from "./components/SpotifyPlayer.js"
import CoolTabs from 'react-cool-tabs';
import './App.css';

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
          leftTabTitle={'Media Player'}
          rightTabTitle={'Webcam View'}
          leftContent={<SpotifyPlayer />}
          rightContent={<Video />}
          contentTransitionStyle={'transform 0.6s ease-in'}
          borderTransitionStyle={'all 0.6s ease-in'} />
      </div>
    );
  }
}
