import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './Navbar';


const Header = ({navText, navId, nav, toNav, history}) => (
  <header className="navbar-wrapper">
    <ul className="navbar">
      <Navbar to='/about' toNav={toNav}>About</Navbar>
      <Navbar to='/articles' toNav={toNav} >文章列表</Navbar>
      <Navbar to='/write-comment' toNav={toNav}>發表文章</Navbar>
      <li className="navbar-read" >
        <div className="navbar-read-ellipsis">
          { !nav ? null : `現在位置： ${nav}` }
        </div>
        <div onClick={() => history.push(`/articles/${navId}`)}>
          { !navText ? null : `閱讀： ${navText}` }
        </div>
      </li>
    </ul>
  </header>
);

export default withRouter(Header);
