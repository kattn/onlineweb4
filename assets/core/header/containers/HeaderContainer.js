import React, { Component } from 'react';
import Header from '../components/Header';


class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.API_URL = '/sso/session_user?format=json';
    this.state = {
      fullname: 'Ola Nordmann',
      username: 'ohno',
      staff: false,
      committee: true,
    };
    this.fetchUser();
  }

  fetchUser() {
    const apiUrl = this.API_URL;
    fetch(apiUrl, { credentials: 'same-origin' })
    .then(response => response.json())
    .then((results) => {
      this.setState({
        fullname: `${results.first_name} ${results.last_name}`,
        username: results.username,
        staff: results.staff,
        committee: results.committee,
      });
    });
  }

  render() {
    return (
      <Header
        fullname={this.state.fullname}
        username={this.state.username}
        staff={this.state.staff}
        committee={this.state.committee}
      />
    );
  }
}

export default HeaderContainer;
