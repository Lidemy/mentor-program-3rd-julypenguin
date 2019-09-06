import React from 'react';
import { connect } from 'react-redux';
import WriteCommentPage from './WriteCommentPage';
import { toActiveNav } from './actions';

const WriteCommentPageContainer = props => (
  <WriteCommentPage {...props} />
);

const mapDispatchToProps = dispatch => ({
  toNav: nav => dispatch(toActiveNav(nav)),
});

export default connect(null, mapDispatchToProps)(WriteCommentPageContainer);
