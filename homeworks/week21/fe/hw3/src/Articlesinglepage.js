import React, { useContext } from 'react';
import context from './context';


const ArticleSinglePage = (props) => {
  const { blog, setBlog } = useContext(context);
  const { userId, id, title, body } = props.content

  const getArticleId = (id) => {
    setBlog({...blog, articleId: id})
  }

  const clearArticleId = () => {
    setBlog({...blog, contents: [], articleId: 0})
  }

  return (
    <div data-userid={userId} key={id} className="article-card">
      <div className="article__content">
        <h1 className="article__content-title">{ title }</h1>
        <p className="article__content-body">{ body }</p>
        { !blog.articleId 
          ? <span className="more" onClick={ () => getArticleId(id) }>閱讀更多...</span> 
          : <div className="back__btn" onClick={ clearArticleId }>上一頁</div> }
      </div>
    </div>
  );
};

export default ArticleSinglePage;