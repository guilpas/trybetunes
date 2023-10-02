import React, { Component } from 'react';
import linkedinImg from '../img/linked-in-logo.png';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div> ©2023 TrybeTunes por Guilherme Pacheco e Silva</div>
        <div>
          Projeto desenvolvido em React durante o curso de Desenvolvimento Web da Trybe
        </div>
        <div className="social-container">
          <img className="social-linkedin" src={ linkedinImg } alt="Linkedin" />
          <span>linkedin.com/in/guilpas/</span>
        </div>
      </footer>
    );
  }
}
