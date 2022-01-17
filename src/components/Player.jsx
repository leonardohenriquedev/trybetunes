import React, { Component } from 'react';
import music from '../pour-over.mp3';
import { playMusic } from '../services/music';

export default class Player extends Component {
  componentDidMount() {
    document.getElementById('backgroundMusic').currentTime = 8;
  }

  render() {
    return (
      <div className="player">
        <audio id="backgroundMusic" loop>
          <source src={music} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}
