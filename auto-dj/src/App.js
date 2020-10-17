import React from 'react';
import CoolTabs from 'react-cool-tabs';
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
    return <div>
      this is the song player
    </div>
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <CoolTabs
          tabKey={'1'}
          style={{ width: 550, height: 500, background: 'white' }}
          activeTabStyle={{ background: 'red', color: 'white' }}
          unActiveTabStyle={{ background: 'green', color: 'black' }}
          activeLeftTabBorderBottomStyle={{ background: 'blue', height: 4 }}
          activeRightTabBorderBottomStyle={{ background: 'yellow', height: 4 }}
          tabsBorderBottomStyle={{ background: 'orange', height: 4 }}
          leftContentStyle={{ background: 'lightgreen' }}
          rightContentStyle={{ background: 'lightblue' }}
          leftTabTitle={'Left title'}
          rightTabTitle={'Right title'}
          leftContent={<Video />}
          rightContent={<Song />}
          contentTransitionStyle={'transform 0.6s ease-in'}
          borderTransitionStyle={'all 0.6s ease-in'} />
      </div>
    );
  }
}
