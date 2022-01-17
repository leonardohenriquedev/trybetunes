import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { pauseMusic } from '../services/music';


export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      currentSearch: '',
      searchResult: undefined,
      pesquisou: false,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchAlbum = this.searchAlbum.bind(this);
    this.renderAlbum = this.renderAlbum.bind(this);
  }

  handleChange(event) {
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    });
  }

  async searchAlbum() {
    const { inputSearch } = this.state;
    const album = inputSearch;

    this.setState({
      inputSearch: '',
      currentSearch: album,
      loading: true,
    });

    const searchResult = await searchAlbumsAPI(album);

    this.setState({
      searchResult,
      loading: false,
      pesquisou: true,
    });
  }

  renderAlbum() {
    const { searchResult, currentSearch } = this.state;
    const albumName = `Estes são os albuns de ${currentSearch}:`;

    return searchResult.length > 0 ? (
      <div className="containerSearchResults">
        <p>{albumName}</p>
        <div className="searchResults">
          {searchResult.map((album) => (
            <div className="searchResult">
              <img src={album.artworkUrl100} />
              <div className="linkAndName">
                <Link
                  to={`/album/${album.collectionId}`}
                  data-testid={`link-to-album-${album.collectionId}`}
                  key={album.collectionId}
                  className="link"
                >
                  {album.collectionName}
                </Link>
                <p>{album.artistName}</p>
                <button><Link
                  to={`/album/${album.collectionId}`}
                  data-testid={`link-to-album-${album.collectionId}`}
                  key={album.collectionId}
                  className="linkOuvir"
                  onClick={pauseMusic}
                >
                  Ouvir
                </Link></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      'Nenhum álbum foi encontrado'
    );
  }

  render() {
    const { inputSearch, loading, pesquisou } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div className="inputSearch">
            <form autoComplete="off">
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={this.handleChange}
                value={inputSearch}
                id="inputSearch"
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    this.searchAlbum();
                  }
                }}
                placeholder="Digite o nome do album ou artista"
              />
              {inputSearch.length >= 2 ? (
                <button
                  data-testid="search-artist-button"
                  onClick={this.searchAlbum}
                  type="button"
                >
                  Pesquisar
                </button>
              ) : (
                <button
                  data-testid="search-artist-button"
                  disabled
                  type="button"
                >
                  Pesquisar
                </button>
              )}
            </form>
          </div>
        )}
        {pesquisou ? this.renderAlbum() : null}
      </div>
    );
  }
}
