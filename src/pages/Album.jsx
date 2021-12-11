import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: undefined,
      loading: false,
      favoriteSongs: [],
    };
    this.isFavorite = this.isFavorite.bind(this);
    this.renderMusics = this.renderMusics.bind(this);
  }

  async componentDidMount() {
    await this.setStates();
  }

  async setStates() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);

    this.setState({
      musics,
    });

    this.setState({
      loading: true,
    });

    const favorites = await getFavoriteSongs();

    this.setState({
      favoriteSongs: favorites,
      loading: false,
    });
  }

  isFavorite(trackId) {
    const { favoriteSongs } = this.state;
    return favoriteSongs
      ? favoriteSongs.some((music) => music.trackId === trackId)
      : false;
  }

  renderMusics() {
    const { musics, favoriteSongs } = this.state;
    let array = [];

    for (let index = 1; index < musics.length; index++) {
      array.push(
        <div>
          <MusicCard
            music={musics[index]}
            favorites={favoriteSongs}
            key={musics[index].trackId}
          />
        </div>
      );
    }
    return array;
  }

  render() {
    const { musics, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {musics !== undefined ? (
          <div className="album">
            <div className="albumInfo">
              <img
                src={`${musics[0].artworkUrl100}`.replace(
                  '100x100bb.jpg',
                  '500x500bb.jpg'
                )}
              />
              <p data-testid="album-name" className="albumName">
                {musics[0].collectionName}
              </p>
              <p data-testid="artist-name" className="artistName">
                {musics[0].artistName}
              </p>
            </div>
            <div className="containerMusics">
              <div className="musics">{this.renderMusics()}</div>
            </div>
            {loading ? <Loading /> : null}
          </div>
        ) : null}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};
