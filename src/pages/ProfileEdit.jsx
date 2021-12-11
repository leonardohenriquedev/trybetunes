import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      profile: [],
      redirect: false,
    };

    this.loadProfile = this.loadProfile.bind(this);
    this.buttonValidation = this.buttonValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateAndRedirect = this.updateAndRedirect.bind(this);
  }

  componentDidMount() {
    this.loadProfile();
  }

  handleChange(event) {
    const { profile } = this.state;

    const { value, id } = event.target;
    this.setState({
      profile: { ...profile, [id]: value },
    });
  }

  buttonValidation() {
    const { profile } = this.state;
    let result = false;
    const email = Object.values(profile)[1];
    result = Object.values(profile).every((value) => value.length > 0);

    if (email !== undefined) {
      if (email.includes('@') && email.includes('.com')) {
        result = true;
      } else result = false;
    }

    return result;
  }

  async loadProfile() {
    this.setState({
      loading: true,
    });

    const profile = await getUser();
    this.setState({
      profile,
      loading: false,
    });
  }

  updateAndRedirect() {
    const { profile } = this.state;
    updateUser(profile);

    this.setState({
      redirect: true,
    });
  }

  render() {
    const { loading, profile, redirect } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div className="profileEdit">
            <form autoComplete="off">
              <label>
                <p>Nome:</p>
                <input
                  type="text"
                  data-testid="edit-input-name"
                  onChange={this.handleChange}
                  value={profile.name}
                  id="name"
                />
              </label>
              <label>
                <p>Email:</p>
                <input
                  type="email"
                  data-testid="edit-input-email"
                  onChange={this.handleChange}
                  value={profile.email}
                  id="email"
                />
              </label>

              <label>
                <p>Descrição:</p>
                <textarea
                  type="text"
                  data-testid="edit-input-description"
                  onChange={this.handleChange}
                  value={profile.description}
                  id="description"
                />
              </label>
              <label>
                <p>Imagem:</p>
                <input
                  type="text"
                  data-testid="edit-input-image"
                  onChange={this.handleChange}
                  value={profile.image}
                  id="image"
                  placeholder='Link da Imagem'
                />
              </label>
              {this.buttonValidation() ? (
                <button
                  type="button"
                  data-testid="edit-button-save"
                  onClick={this.updateAndRedirect}
                >
                  Salvar
                </button>
              ) : (
                <button type="button" data-testid="edit-button-save" disabled>
                  Salvar
                </button>
              )}
            </form>
          </div>
        )}
        {redirect ? <Redirect to="/profile" /> : null}
      </div>
    );
  }
}
