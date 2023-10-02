import PropTypes from 'prop-types';
import React, { Component } from 'react';
import logo from '../img/trybe-tunes-logo.png';

export default class Form extends Component {
  render() {
    const { loginName, valido, validate, loginEnter } = this.props;
    return (
      <div data-testid="page-login" className="login">
        <img src={ logo } alt="TrybeTunes" />
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ validate }
            value={ loginName }
            placeholder="Nome"
          />
          <button
            data-testid="login-submit-button"
            disabled={ !valido }
            onClick={ loginEnter }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  loginEnter: PropTypes.func.isRequired,
  loginName: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
  valido: PropTypes.bool.isRequired,
};
