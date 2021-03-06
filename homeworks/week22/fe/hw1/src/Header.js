import React from 'react';
import Navbar from './Navbar';

const Header = () => (
  <header className="navbar-wrapper">
    <ul className="navbar">
      <Navbar to='/about'>About</Navbar>
      <Navbar to='/articles'>文章列表</Navbar>
    </ul>
  </header>
);

export default Header;
