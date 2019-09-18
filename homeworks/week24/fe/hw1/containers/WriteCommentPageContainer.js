import React from 'react';
import { connect } from 'react-redux';
import WriteCommentPage from '../components/WriteCommentPage';
import { Actions } from '../actions';

const WriteCommentPageContainer = props => (
  <WriteCommentPage {...props} />
);

const mapStateToProps = store => ({
  createPostError: store.post.createPostError,
  linkTo: store.post.linkTo,
});

const mapDispatchToProps = {
  createPost: Actions.CREATE_POST,
  clearCreateErr: Actions.CLEAR_CREATE_ERR,
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteCommentPageContainer);
