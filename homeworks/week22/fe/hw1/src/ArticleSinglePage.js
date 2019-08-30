import React from 'react';
import { useFetchArticles } from './hocs/useFetchArticles';

const ArticleSinglePage = ({ history, match }) => {
  const { contents } = useFetchArticles(match);

  return (
    <div data-userid={contents.userId} className="article-card">
      <div className="article__content">
        <h1 className="article__content-title">{ contents.title }</h1>
        <p className="article__content-body">{ contents.body }</p>
          <div className="back__btn" onClick={() => history.push('/articles')}>上一頁</div>
      </div>
    </div>
  );
};

export default ArticleSinglePage;
