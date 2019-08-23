import React, { useContext, useEffect, Fragment } from 'react';
import context from './context';
import ArticleSinglePage from './Articlesinglepage';


const Articlepage = () => {
  const { blog, setBlog } = useContext(context);
  const { contents, articleId, filter } = blog;

  const myFetch = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const jsonData = await response.json();
    setBlog({...blog, contents: jsonData})
  }

  useEffect(() => {
    const id = articleId || '';
    myFetch(id)
  }, [articleId])

  const visibleArticle = articleId || contents.filter(content => content.title.includes(filter) || content.body.includes(filter))

  return (
    <Fragment>
      { 
        !articleId 
          ? visibleArticle.map(content => (<ArticleSinglePage content={content} key={content.id} />)) 
          : <ArticleSinglePage content={contents}/>
      }
    </Fragment>
  );
};

export default Articlepage;