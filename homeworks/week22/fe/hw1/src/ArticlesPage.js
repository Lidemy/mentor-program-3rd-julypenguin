import React, { Fragment } from 'react';
import { useFetchArticles } from './hocs/useFetchArticles';

const ArticlePage = ({ history, match }) => {
  const { contents } = useFetchArticles(match);

  return (
    <Fragment>
      { 
        contents.map(content => (
          <div data-userid={content.userId} key={content.id} className="article-card">
            <div className="article__content">
              <h1 className="article__content-title">{ content.title }</h1>
              <p className="article__content-body ellipsis">{ content.body }</p>
                <span className="more" onClick={() => { history.push(`/articles/${content.id}`) }}>
                  閱讀更多...
                </span>
            </div>
          </div>
        ))
      }
    </Fragment>
  );
};

export default ArticlePage;
