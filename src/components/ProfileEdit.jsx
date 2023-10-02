import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import userLogo from '../img/user-logo.png';
import { isEmail, isLengthMoreThanMax } from '../services/just-validate.es';

export default class ProfileEdit extends Component {
  state = {
    valido: false,
    name: '',
    email: '',
    description: '',
    image: '',
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({ ...user }, this.validate);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user !== user) {
      this.setState({ ...user }, this.validate);
    }
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  };

  validate = () => {
    const { name, email, description, image } = this.state;
    const val1 = isLengthMoreThanMax(name, 2);
    const val2 = isEmail(email);
    const val3 = isLengthMoreThanMax(description, 0);
    const val4 = isLengthMoreThanMax(image, 0);
    const valido = val1 && val2 && val3 && val4;
    this.setState({ valido });
  };

  save = () => {
    const { history, saveUser } = this.props;
    const { name, email, description, image } = this.state;
    const user = { name, email, description, image };
    history.push('/profile');
    saveUser(user);
  };

  render() {
    const { user } = this.props;
    const { valido, name, email, description, image } = this.state;

    if (!user.name) {
      return <Loading />;
    }

    return (
      <div data-testid="page-profile-edit" className="profile">
        <div className="profile-top">
          <img src={ image || userLogo } alt="user" onChange={ this.onChange } />
          <input
            name="image"
            data-testid="edit-input-image"
            value={ image }
            onChange={ this.onChange }
          />
        </div>
        <div>
          <h3>Nome</h3>
          <input
            name="name"
            data-testid="edit-input-name"
            value={ name }
            onChange={ this.onChange }
          />
        </div>
        <div>
          <h3>E-mail</h3>
          <input
            name="email"
            data-testid="edit-input-email"
            value={ email }
            onChange={ this.onChange }
          />
        </div>
        <div>
          <h3>Descrição</h3>
          <textarea
            name="description"
            rows="6"
            data-testid="edit-input-description"
            value={ description }
            onChange={ this.onChange }
          />
        </div>
        <button
          data-testid="edit-button-save"
          disabled={ !valido }
          onClick={ this.save }
        >
          Salvar
        </button>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  user: PropTypes.shape({
    description: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveUser: PropTypes.func.isRequired,
};
