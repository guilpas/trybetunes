import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import userLogo from '../img/user-logo.png';

export default class Profile extends Component {
  render() {
    const { user } = this.props;
    const { name, email, description, image } = user;

    if (!user.name) {
      return <Loading />;
    }

    return (
      <div data-testid="page-profile" className="profile">
        <div className="profile-top">
          <img src={ image || userLogo } data-testid="profile-image" alt="user" />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
        <div>
          <h3>Nome</h3>
          <p>{ name }</p>
        </div>
        <div>
          <h3>E-mail</h3>
          <p>{email}</p>
        </div>
        <div>
          <h3>Descrição</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    description: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
