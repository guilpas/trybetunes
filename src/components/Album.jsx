import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    artistName: undefined,
    albumName: undefined,
    albumImg: undefined,
    tracks: [],
    tracksFavorites: [],
    loading: false,
    playing: null,
  };

  componentDidMount() {
    this.musics();
  }

  favoritar = async (evt) => {
    const { tracks, tracksFavorites } = this.state;
    const id = Number(evt.target.value);
    const index = tracks.findIndex((track) => track.trackId === id);
    if (!tracksFavorites[index]) await addSong(tracks[index]);
    else await removeSong(tracks[index]);
    tracksFavorites[index] = !tracksFavorites[index];
    this.setState({
      tracksFavorites,
    });
  };

  onlyOnePlaying = (evt) => {
    const { playing } = this.state;
    if (playing) playing.pause();
    this.setState({ playing: evt.target });
  };

  musics = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const result = await getMusics(id);
    const [info, ...tracks] = result;
    const albumImg = info.artworkUrl100.replace('100x100', '300x300');
    const favoritas = await getFavoriteSongs();
    const favoritasAlbum = favoritas.filter(
      (favorites) => favorites.collectionId === info.collectionId,
    );
    const tracksFavorites = tracks.map((track) => favoritasAlbum
      .some((favorita) => track.trackId === favorita.trackId));
    this.setState({
      artistName: info.artistName,
      albumName: info.collectionName,
      albumImg,
      tracks,
      tracksFavorites,
    });
  };

  render() {
    const {
      artistName,
      albumName,
      albumImg,
      tracks,
      loading,
      tracksFavorites,
    } = this.state;
    if (loading || !albumImg) {
      return <Loading />;
    }
    const tracksPreview = tracks.map((track, index) => (
      <MusicCard
        key={ index }
        track={ track }
        favorite={ tracksFavorites[index] }
        favoritar={ this.favoritar }
        onlyOnePlaying={ this.onlyOnePlaying }
      />
    ));
    return (
      <>
        <div className="fav-bg" />
        <div data-testid="page-album" className="album">
          <div className="album-info">
            <img src={ albumImg } alt={ albumName } />
            <h2 data-testid="album-name">{albumName}</h2>
            <i data-testid="artist-name">{artistName}</i>
          </div>
          <ol className="music-list">{tracksPreview}</ol>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
