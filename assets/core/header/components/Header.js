import React, { PropTypes } from 'react';
import Logo from './Logo';
import Navbar from './Navbar';
import UserMenu from './UserMenu';

const Header = ({ fullname, username, staff, committee }) => (
  <div className="Header">
    <div className="Header__container">
      <Logo />
      <Navbar />
      <UserMenu fullname={fullname} username={username} staff={staff} committee={committee} />
    </div>
  </div>
);

Header.propTypes = {
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  staff: PropTypes.bool.isRequired,
  committee: PropTypes.bool.isRequired,
};

export default Header;
