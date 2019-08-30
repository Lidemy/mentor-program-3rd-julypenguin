import React from 'react';
import AboutPage from './AboutPage';
import ArticlesPage from './ArticlesPage';
import ArticleSinglePage from './ArticleSinglePage';
import { Route } from 'react-router-dom';

const Article = () => (
  <article className="article">
    <Route exact path="/" component={ArticlesPage} />
    <Route path="/about" component={AboutPage} />
    <Route exact path="/articles" component={ArticlesPage} />
    <Route path="/articles/:id" component={ArticleSinglePage} /> 
  </article>
  );

export default Article;