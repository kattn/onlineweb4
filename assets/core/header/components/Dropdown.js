import React, { PropTypes, Component } from 'react';
import { Glyphicon } from 'react-bootstrap';


class Dropdown extends Component {
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
      <ul className="Dropdown__menu">
        {this.props.staff && <li className="Dropdown__menu-item">
          <a className="Dropdown__menu-item-text" href="/admin/">Administrasjon</a>
        </li>}
        {this.props.committee && <li className="Dropdown__menu-item">
          <a className="Dropdown__menu-item-text" href="/dashboard/">Dashboard</a>
        </li>}
        <li className="Dropdown__menu-item">
          <a className="Dropdown__menu-item-text" href="/profile/">Min side: { username }</a>
        </li>
        <li className="Dropdown__menu-item">
          <a className="Dropdown__menu-item-text" href="/contact/">Kontakt oss</a>
        </li>
        <li className="Dropdown__menu-item">
          <a className="Dropdown__menu-item-text" href="/profile/user_search/">Finn brukere</a>
        </li>
        <li className="Dropdown__menu-item">
          <a className="Dropdown__menu-item-text" href="/auth/logout/">Logg ut</a>
        </li>
      </ul>
    );
  }

  render() {
    const dropdownMenu = this.buildMenu();
    return (
      <div className="Dropdown">
        <a href="#login-menu" className="Dropdown__icon" onClick={e => this.handleClick(e)}>
          <Glyphicon glyph="user" />
        </a>
        {dropdownMenu}
      </div>
    );
  }
}

Dropdown.propTypes = {
  username: PropTypes.string.isRequired,
  staff: PropTypes.bool.isRequired,
  committee: PropTypes.bool.isRequired,
};

export default Dropdown;
