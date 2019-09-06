import React, { useState } from 'react';
import { useFetchArticles } from './hocs/useFetchArticles';

const WriteCommentPage = ({ match, history, toNav }) => {
  const { setApi } = useFetchArticles(match, history);
  const [submitData, setSubmitData] = useState({ author: '', title: '', body: '' });
  const { author, title, body } = submitData;

  const onChange = (e) => {
    setSubmitData({
      ...submitData,
      [e.target.id]: e.target.value,
    });
  };

  const postComment = (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      body,
    };
    setApi('POST', '', data);
    toNav('文章列表');
  };

  return (
    <div>
      <form className="writeComment__form" onSubmit={postComment}>
        <label className="writeComment__label" htmlFor="author">您的名子：</label>
        <input className="writeComment__input" value={author} onChange={onChange} id="author" />

        <label className="writeComment__label" htmlFor="title">文章標題：</label>
        <input className="writeComment__input" value={title} onChange={onChange} id="title" />

        <label className="writeComment__label" htmlFor="body">內文：</label>
        <textarea className="writeComment__textarea" value={body} onChange={onChange} id="body" rows="50" />

        <div className="flex-end">
          <button className="writeComment__submit" type="submit">發文囉</button>
        </div>
      </form>
    </div>
  );
};

export default WriteCommentPage;
