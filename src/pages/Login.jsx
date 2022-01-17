import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logo from '../login.png';
import video from '../garden.mp4';
import music from '../pour-over.mp3';
import { playMusic } from '../services/music';

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
    const { history } = this.props;

    this.setState({
      loading: true,
    });

    await createUser(inputName);

    this.setState(
      {
        loading: false,
        // redirect: true,
      },
      () => history.push('/search')
    );
  }

  renderPage() {
    const { inputName, redirect } = this.state;
    const minimumLength = 3;

    return redirect ? (
      <Redirect to="/search" />
    ) : (
      <div data-testid="page-login" className="loginContainer">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4"></source>
        </video>
        <div className="login-wrapper">
          <audio id="backgroundMusic">
            <source src={music} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <img src={logo} alt="trybe-logo" />
          {/* <h1>Tunes</h1> */}
          <form autoComplete="off" className="loginForm">
            <div className="boxName">
              <label htmlFor="inputName" className="labelName">
                Nome
              </label>
              <input
                type="text"
                value={inputName}
                onChange={this.handleChange}
                data-testid="login-name-input"
                id="inputName"
                // placeholder="Nome"
                autoComplete="off"
                onClick={playMusic}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    this.onLoading({ name: inputName });
                  }
                }}
              />
            </div>
            {/* <input
              type="password"
              placeholder="Senha"
              autoComplete="off"
            ></input> */}
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
          <p className="frontEnd">
            Projeto desenvolvido durante o modulo de <b>Front-End</b> enquanto estudava
            na <b>Trybe.</b>
          </p>
          <div className='sidebar'>
            <p>Desenvolvido por Leonardo Henrique.</p> <p>Consumindo API do iTunes.</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return loading ? <Loading /> : this.renderPage();
  }
}
