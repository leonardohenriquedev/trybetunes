import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      profile: [],
      loading: false,
    };

    this.loadProfile = this.loadProfile.bind(this);
  }

  componentDidMount() {
    this.loadProfile();
  }

  async loadProfile() {
    this.setState({
      loading: true,
    });

    const profile = await getUser();
    this.setState({
      profile,
    });

    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, profile } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div className="profilePage">
            {profile.image ? (
              <img
                src={profile.image}
                data-testid="profile-image"
                alt="profile"
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
                data-testid="profile-image"
                alt="profile"
              />
            )}

            <p className="profileName">{profile.name}</p>
            <p className="profileEmail">{profile.email}</p>
            <p className="profileDescription">{profile.description}</p>
            <Link to="/profile/edit" className="Link">
              Editar perfil
            </Link>
          </div>
        )}
      </div>
    );
  }
}
