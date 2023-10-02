import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getUser, updateUser } from './services/userAPI';
import Album from './components/Album';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Favorites from './components/Favorites';
import Search from './components/Search';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    user: { nome: '', image: '', description: '', email: '' },
  };

  getUserInfo = async () => {
    const user = await getUser();
    this.setState({
      user,
    });
  };

  saveUser = async (user) => {
    this.setState({ user });
    await updateUser(user);
  };

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route
            path={ ['/favorites', '/search', '/profile', '/album'] }
            render={ (props) => (
              <Header
                { ...props }
                user={ user }
                getUserInfo={ this.getUserInfo }
              />) }
          />
          <Route component={ NotFound } />
        </Switch>
        <Switch>
          <Route path="/album/:id" component={ Album } />
          <Route
            path="/profile/edit"
            render={ (props) => (
              <ProfileEdit
                { ...props }
                user={ user }
                saveUser={ this.saveUser }
              />) }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route
            path="/profile"
            render={ (props) => (
              <Profile
                { ...props }
                user={ user }
              />) }
          />
          <Route path="/search" component={ Search } />
        </Switch>
        <Switch>
          <Route
            path={ ['/favorites', '/search', '/profile', '/album'] }
            component={ Footer }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
