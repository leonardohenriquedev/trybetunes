import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  addSong,
  removeSong,
  getFavoriteSongs,
} from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };

    this.handleCange = this.handleCange.bind(this);
    this.setFavorites = this.setFavorites.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    this.setFavorites();
  }

  async handleCange(event) {
    const { checked } = event.target;
    const { music, updateFavorites } = this.props;

    this.setState({
      loading: true,
    });

    if (checked) {
      await addSong(music);
    } else {
      removeSong(music);
      if (updateFavorites !== undefined) {
        updateFavorites();
      }
    }

    const favorites = await getFavoriteSongs();

    this.setState({
      loading: false,
      favorites,
    });
  }

  async setFavorites() {
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
    });
  }

  renderPage() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { favorites, loading } = this.state;

    if (previewUrl !== undefined) {
      return (
        <div className="music">
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={previewUrl} controls>
            <track kind="captions" />O seu navegador não suporta o elemento{' '}
            <code>audio</code>
          </audio>
          <label htmlFor={trackId}>
            Favorita
            <input
              type="checkbox"
              data-testid={`checkbox-music-${trackId}`}
              onChange={this.handleCange}
              checked={favorites.some((song) => song.trackId === trackId)}
              id={trackId}
            />
          </label>
          {loading ? <Loading byFavorites="true" /> : null}
        </div>
      );
    }
    return null
  }

  render() {
    const { music } = this.props;

    const { trackName, previewUrl, trackId } = music;

    const { favorites, loading } = this.state;
    return this.renderPage();
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(Object).isRequired,
  updateFavorites: PropTypes.func,
};

MusicCard.defaultProps = {
  updateFavorites: undefined,
};
