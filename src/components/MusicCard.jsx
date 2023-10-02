import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { track, favorite, favoritar, onlyOnePlaying } = this.props;
    const { trackName, previewUrl, trackId, artistName } = track;
    const { showBand } = this.props;
    return (
      <div className="music-container">
        { showBand && <div className="music-title">{artistName}</div> }
        <div className="music-title">{trackName}</div>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
          onPlay={ onlyOnePlaying }
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <div className="heart-container">
          <label className="heart-label">
            <span className="hide-me">Favorita</span>
            <input
              type="checkbox"
              className="heart-check"
              value={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ favoritar }
              checked={ favorite }
            />
            <span />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favoritar: PropTypes.func.isRequired,
  onlyOnePlaying: PropTypes.func.isRequired,
  favorite: PropTypes.bool,
  showBand: PropTypes.bool,
  track: PropTypes.shape({
    artistName: PropTypes.string,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    trackName: PropTypes.string.isRequired,
  }),
};

MusicCard.defaultProps = {
  favorite: true,
  showBand: false,
  track: { artistName: 'Desconhecido' },
};
