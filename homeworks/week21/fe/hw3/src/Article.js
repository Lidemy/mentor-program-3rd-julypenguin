import React, { useContext } from 'react';
import context from './context';
import AboutPage from './Aboutpage';
import ArticlesPage from './Articlespage';

const Article = () => {
  const { blog } = useContext(context);
  const { selectNav } = blog;

  return (
    <article className="article">
      { selectNav === 'About' ? <AboutPage /> : null }
      { selectNav === '文章列表' ? <ArticlesPage /> : null }
    </article>
  );
};

export default Article;