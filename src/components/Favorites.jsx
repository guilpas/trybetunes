import React, { Component } from 'react';
import Loading from './Loading';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

export default class Favorites extends Component {
  state = {
    loading: true,
    tracks: [],
    playing: null,
  };

  componentDidMount() {
    this.getTracks();
  }

  favoritar = async (evt) => {
    const { tracks } = this.state;
    const id = Number(evt.target.value);
    const index = tracks.findIndex((track) => track.trackId === id);
    await removeSong(tracks[index]);
    tracks.splice(index, 1);
    this.setState({
      tracks,
    });
  };

  onlyOnePlaying = (evt) => {
    const { playing } = this.state;
    if (playing) playing.pause();
    this.setState({ playing: evt.target });
  };

  getTracks = async () => {
    const tracks = await getFavoriteSongs();
    this.setState({
      tracks,
      loading: false,
    });
  };

  render() {
    const { loading, tracks } = this.state;

    if (loading) {
      return <Loading />;
    }

    const tracksPreview = tracks.map((track, index) => (
      <MusicCard
        key={ index }
        track={ track }
        favoritar={ this.favoritar }
        showBand
        onlyOnePlaying={ this.onlyOnePlaying }
      />
    ));

    return (
      <>
        <div className="fav-bg" />
        <div data-testid="page-favorites" className="album">
          <div>
            <h2>Músicas favoritas:</h2>
            { tracksPreview.length > 0
            && <ol className="music-list">{tracksPreview}</ol> }
            { tracksPreview.length === 0 && <h3>Nenhuma música favoritada.</h3> }
          </div>
        </div>
      </>
    );
  }
}
