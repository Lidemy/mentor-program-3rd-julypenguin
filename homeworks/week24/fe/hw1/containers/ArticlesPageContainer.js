import React from 'react';
import { connect } from 'react-redux';
import ArticlesPage from '../components/ArticlesPage';
import { Actions } from '../actions';

const ArticlePageContainer = props => (
  <ArticlesPage {...props} />
);

const mapStateToProps = store => ({
  postList: store.post.postList,
  isLoadingCreatePost: store.post.isLoadingCreatePost,
  isLoadingGetPostList: store.post.isLoadingGetPostList,
  isLoadingDeletePost: store.post.isLoadingDeletePost,
  getPostListError: store.post.getPostListError,
});

const mapDispatchToProps = {
  getPostList: Actions.GET_POST_LIST,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePageContainer);
