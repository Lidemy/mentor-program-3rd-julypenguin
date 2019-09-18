import React from 'react';
import { Route } from 'react-router-dom';
import AboutPage from './AboutPage';
import ArticlesPage from '../containers/ArticlesPageContainer';
import ArticleSinglePage from '../containers/ArticleSinglePageContainer';
import WriteCommentPage from '../containers/WriteCommentPageContainer';

const Article = () => (
  <article className="article">
    <Route exact path="/" component={ArticlesPage} />
    <Route path="/about" component={AboutPage} />
    <Route exact path="/articles" component={ArticlesPage} />
    <Route path="/articles/:id" component={ArticleSinglePage} />
    <Route path="/write-comment" component={WriteCommentPage} />
  </article>
);

export default Article;
