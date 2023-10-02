import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        NotFound
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}
