import React from 'react';
import { connect } from 'react-redux';
import ArticlesPage from './ArticlesPage';
import { toActiveNav } from './actions';

const ArticlePageContainer = props => (
  <ArticlesPage {...props} />
);

const mapDispatchToProps = dispatch => ({
  toNav: nav => dispatch(toActiveNav(nav)),
});

export default connect(null, mapDispatchToProps)(ArticlePageContainer);
