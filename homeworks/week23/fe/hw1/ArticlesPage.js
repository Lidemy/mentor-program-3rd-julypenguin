import React, { Fragment } from 'react';
import { useFetchArticles } from './hocs/useFetchArticles';

const ArticlePage = ({ history, match, toNav }) => {
  const { contents } = useFetchArticles(match);

  return (
    <Fragment>
      { 
        contents.map(({ id, title, body }) => (
          <div className="article__content" key={id}>
            <h1 className="article__content-title">{ title }</h1>
            <p className="article__content-body ellipsis">{ body }</p>
            <span className="more" onClick={() => {
              toNav(title)
              history.push(`/articles/${id}`)
            }}>
              閱讀更多...
            </span>
          </div>
        ))
      }
    </Fragment>
  );
};

export default ArticlePage;
