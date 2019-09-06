import React from 'react';
import { connect } from 'react-redux';
import ArticleSinglePage from './ArticleSinglePage';
import { toActiveNav } from './actions';

const ArticleSinglePageContainer = props => (
  <ArticleSinglePage {...props} />
);

const mapDispatchToProps = dispatch => ({
  toNav: nav => dispatch(toActiveNav(nav)),
});

export default connect(null, mapDispatchToProps)(ArticleSinglePageContainer);
