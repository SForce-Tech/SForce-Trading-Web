import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';

const Header: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/manage-users">Manage Users</Link></li>
        <li><Logout /></li>
      </ul>
    </nav>
  );
};

export default Header;
