import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logo from '../login.png';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onLoading = this.onLoading.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  handleChange(event) {
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    });
  }

  async onLoading(inputName) {
    this.setState({
      loading: true,
    });

    await createUser(inputName);

    this.setState({
      loading: false,
      redirect: true,
    });
  }

  renderPage() {
    const { inputName, redirect } = this.state;
    const minimumLength = 3;

    return redirect ? (
      <Redirect to="/search" />
    ) : (
      <div data-testid="page-login" className="loginContainer">
        <img src={logo} alt="trybe-logo" />
        <form autoComplete="off" className="loginForm">
          <label htmlFor="inputName"></label>
          <input
            type="text"
            value={inputName}
            onChange={this.handleChange}
            data-testid="login-name-input"
            id="inputName"
            placeholder="Nome"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                this.onLoading({ name: inputName });
              }
            }}
          />
          {inputName.length >= minimumLength ? (
            <button
              data-testid="login-submit-button"
              onClick={() => this.onLoading({ name: inputName })}
              type="button"
            >
              Entrar
            </button>
          ) : (
            <button type="submit" data-testid="login-submit-button" disabled>
              Entrar
            </button>
          )}
        </form>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return loading ? <Loading /> : this.renderPage();
  }
}
