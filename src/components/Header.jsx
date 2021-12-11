import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loading: true,
    };

    this.renderUser = this.renderUser.bind(this);
  }

  componentDidMount() {
    this.renderUser();
  }

  async renderUser() {
    const user = await getUser();

    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    const { name } = user;
    return loading ? (
      <Loading />
    ) : (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search" className="headerLinks">
          Search
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
          className="headerLinks"
        >
          Favorites
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
          className="headerLinks"
        >
          Profile
        </Link>
        <Link to="/profile" className="profileButton">
          {name}
        </Link>

        {/* <button data-testid="header-user-name">{name}</button> */}
      </header>
    );
  }
}
