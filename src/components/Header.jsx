import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/trybe-tunes-logo.png';
import userLogo from '../img/user-logo.png';

export default class Header extends Component {
  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }

  render() {
    const { location, user } = this.props;
    const userImage = user ? user.image : null;
    const userName = user ? user.name : null;
    return (
      <header data-testid="header-component">
        <img src={ logo } alt="trybetunes-logo" className="logo" />
        <section className="user">
          <img src={ userImage || userLogo } alt="user" />
          <h2 data-testid="header-user-name">
            {userName || 'Carregando...'}
          </h2>
        </section>
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
            className={ location.pathname === '/search' ? 'ativado' : 'inativo' }
          >
            <h3>Pesquisar</h3>
          </Link>

          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className={ location.pathname === '/favorites' ? 'ativado' : 'inativo' }
          >
            <h3>Favoritos</h3>
          </Link>

          <Link
            to="/profile"
            data-testid="link-to-profile"
            className={ location.pathname === '/profile' ? 'ativado' : 'inativo' }
          >
            <h3>Perfil</h3>
          </Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  getUserInfo: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: { name: null, image: null },
};
