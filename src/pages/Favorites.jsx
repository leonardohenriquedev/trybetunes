import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      loading: undefined,
    };

    this.loadFavoriteSongs = this.loadFavoriteSongs.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
  }

  componentDidMount() {
    this.loadFavoriteSongs();
  }

  async loadFavoriteSongs() {
    this.setState({
      loading: true,
    });

    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  async updateFavorites() {
    const favorites = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favorites,
    });
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div className="favoritas">
            <p>Favoritas</p>
            {favoriteSongs.map((song) => (
              <MusicCard
                music={song}
                updateFavorites={this.updateFavorites}
                key={song.trackId}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
