import React from 'react';
import { Route, withRouter } from 'react-router-dom';

const Navbar = ({ to, children, history }) => (
  <Route
    path={to}
    exact={false}
    children={({ match }) => (
      <li className={`navbar-menu ${match ? "active" : ""}`} onClick={() => history.push(to)}>
        { children }
      </li>
    )}
  />
);

export default withRouter(Navbar);
