import React from 'react';
import { connect } from 'react-redux';
import Header from './Header.js';
import { toActiveNav } from './actions';

const HeaderContainer = props => <Header {...props} />;

const mapStateToProps = state => ({
  nav: state.nav.nav,
});

const mapDispatchToProps = dispatch => ({
  toNav: nav => dispatch(toActiveNav(nav)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
