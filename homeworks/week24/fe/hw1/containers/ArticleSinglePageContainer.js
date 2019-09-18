import React from 'react';
import { connect } from 'react-redux';
import ArticleSinglePage from '../components/ArticleSinglePage';
import { Actions } from '../actions';

const ArticleSinglePageContainer = props => (
  <ArticleSinglePage {...props} />
);

const mapStateToProps = store => ({
  post: store.post.post,
  isLoadingGetPost: store.post.isLoadingGetPost,
  isLoadingUpdatePost: store.post.isLoadingUpdatePost,
  isLoadingDeletePost: store.post.isLoadingDeletePost,
  isRequestAgain: store.post.isRequestAgain,
  getPostError: store.post.getPostError,
  updatePostError: store.post.updatePostError,
  deletePostError: store.post.deletePostError,
  linkTo: store.post.linkTo,
});

const mapDispatchToProps = {
  getPost: Actions.GET_POST,
  updatePost: Actions.UPDATE_POST,
  deletePost: Actions.DELETE_POST,
  clearDeleteErr: Actions.CLEAR_DELETE_ERROR,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSinglePageContainer);
