import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import '../src/App.css';
import Player from './components/Player';
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" render={() => <Player />} />
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <Route path="/search" render={() => <Search />} />
        <Route path="/album/:id" render={(props) => <Album {...props} />} />
        <Route path="/favorites" render={() => <Favorites />} />
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/editing" render={() => <ProfileEdit />} />
        {/* <Route path="*" render={() => <NotFound />} /> */}
      </BrowserRouter>
    );
  }
}

export default App;
