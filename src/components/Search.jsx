import React, { Component } from 'react';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from './AlbumCard';

export default class Search extends Component {
  state = {
    valido: false,
    texto: '',
    loading: false,
    result: undefined,
  };

  validate = (evt) => {
    const input = evt.target;
    const valido = input.value.length > 1;
    this.setState({
      valido,
      texto: input.value,
    });
  };

  searchArtist = async (evt) => {
    evt.preventDefault();
    const { texto } = this.state;
    this.setState({
      valido: false,
      texto: '',
      loading: true,
    });
    const result = { artist: texto, albums: await searchAlbumsAPI(texto) };
    this.setState({
      loading: false,
      result,
    });
  };

  render() {
    const { texto, loading, valido, result } = this.state;

    if (loading) {
      return <Loading />;
    }

    const busca = (
      <div data-testid="page-search" className="search">
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.validate }
            value={ texto }
            placeholder="Nome do Artista"
          />
          <button
            data-testid="search-artist-button"
            disabled={ !valido }
            onClick={ this.searchArtist }
          >
            Entrar
          </button>
        </form>
      </div>
    );

    if (result && result.albums.length === 0) {
      return (
        <>
          { busca }
          <h1 className="message-not-found">Nenhum álbum foi encontrado</h1>
        </>
      );
    }

    if (result && result.albums.length > 0) {
      const { artist, albums } = result;
      return (
        <>
          { busca }
          <h3>
            { `Resultado de álbuns de: ${artist}` }
          </h3>
          <ul className="albums">
            { albums.map((
              { collectionName, collectionId, artworkUrl100, artistName },
            ) => (
              <li key={ collectionId }>
                <AlbumCard
                  collectionName={ collectionName }
                  collectionId={ collectionId }
                  artworkUrl100={ artworkUrl100 }
                  artistName={ artistName }
                />
              </li>
            ))}
          </ul>
        </>
      );
    }

    return (
      busca
    );
  }
}
