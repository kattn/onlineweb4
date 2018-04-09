import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Profile from '../components/Profile'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
        user: undefined
    };

    this.API_URL = '/api/v1/users?format=json';
  }

  componentDidMount() {
    fetch(this.API_URL, { credentials: 'same-origin' })
        .then(response => response.json())
        .then(data => this.setState({user: data.results[1]}));
  }

  render() {
      const { user } = this.state;
    return (
      <div>
          <p>Hello World</p>
          <img class="profile-image" src="https://www.gravatar.com/avatar/f5ec9f0c82f584c4da9ebf44f2ad30f6?d=https%3A%2F%2Fonline.ntnu.no%2Fstatic%2Fimg%2Fprofile_default_male.png&s=286"></img>
      </div>
    );
  }
}

export default App;
