import React, { useEffect, Fragment } from 'react';
import Loading from '../loading/Loading';

const ArticlePage = ({
  history,
  postList,
  getPostList,
  isLoadingGetPostList,
  isLoadingCreatePost,
  isLoadingDeletePost,
  getPostListError,
}) => {

  useEffect(() => {
    getPostList();
  }, [getPostList, isLoadingCreatePost, isLoadingDeletePost])

  return (
    <Fragment>    
      { getPostListError && <h1 className="err">好像出了點問題，晚點再來逛吧！</h1>}
      { isLoadingGetPostList? <Loading/> :
        postList.map(({ id, title, body, author = null }) => (
          <div className="article__content" key={id}>
            <h3>作者：{author}</h3>
            <h1 className="article__content-title">{ title }</h1>
            <p className="article__content-body ellipsis">{body}</p>
            <span className="more" onClick={() =>history.push(`/articles/${id}`)}>
              閱讀更多...
            </span>
          </div>
        ))
      }
    </Fragment>
  );
};

export default ArticlePage;
