import React from 'react';
import { Route, withRouter } from 'react-router-dom';

const Navbar = ({ to, children, history, toNav }) => (
  <Route
    path={to}
    exact={false}
    children={({ match }) => (
      <li className={`navbar-menu ${match ? "active" : ""}`} onClick={() => {
        toNav(children)
        history.push(to)
      }}>
        { children }
      </li>
    )}
  />
);

export default withRouter(Navbar);
