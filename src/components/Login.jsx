import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Form from './Form';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    valido: false,
    loginName: '',
    loading: false,
  };

  validate = (evt) => {
    const input = evt.target;
    const valido = input.value.length > 2;
    this.setState({
      valido,
      loginName: input.value,
    });
  };

  loginEnter = async (evt) => {
    evt.preventDefault();
    const { loginName } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: loginName });
    this.setState({
      loading: false,
    });
    history.push('/search');
  };

  render() {
    const { loginName, loading, valido } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <Form
        loginName={ loginName }
        valido={ valido }
        validate={ this.validate }
        loginEnter={ this.loginEnter }
      />
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
