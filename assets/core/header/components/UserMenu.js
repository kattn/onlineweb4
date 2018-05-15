import React, { PropTypes, Component } from 'react';
import { Glyphicon } from 'react-bootstrap';


class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  buildMenu() {
    if (!this.state.isOpen) {
      return null;
    }
    const username = this.props.username;
    return (
      <ul className="UserMenu__menu">
        {this.props.staff && <li className="UserMenu__menu-item">
          <a className="UserMenu__menu-item-text" href="/admin/">Administrasjon</a>
        </li>}
        {this.props.committee && <li className="UserMenu__menu-item">
          <a className="UserMenu__menu-item-text" href="/dashboard/">Dashboard</a>
        </li>}
        <li className="UserMenu__menu-item">
          <a className="UserMenu__menu-item-text" href="/profile/">Min side: { username }</a>
        </li>
        <li className="UserMenu__menu-item">
          <a className="UserMenu__menu-item-text" href="/contact/">Kontakt oss</a>
        </li>
        <li className="UserMenu__menu-item">
          <a className="UserMenu__menu-item-text" href="/profile/user_search/">Finn brukere</a>
        </li>
        <li className="UserMenu__menu-item">
          <a className="UserMenu__menu-item-text" href="/auth/logout/">Logg ut</a>
        </li>
      </ul>
    );
  }

  render() {
    const UserMenuMenu = this.buildMenu();
    return (
      <div className="UserMenu">
        <div className="UserMenu__profile">
          <p className="UserMenu__profile-name">{ this.props.fullname }</p>
          <p className="UserMenu__profile-username">{ this.props.username }</p>
        </div>
        <a href="#login-menu" className="UserMenu__icon" onClick={e => this.handleClick(e)}>
          <Glyphicon glyph="user" />
        </a>
        {UserMenuMenu}
      </div>
    );
  }
}

UserMenu.propTypes = {
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  staff: PropTypes.bool.isRequired,
  committee: PropTypes.bool.isRequired,
};

export default UserMenu;
