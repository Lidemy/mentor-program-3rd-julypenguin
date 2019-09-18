import React, { useState, useEffect } from 'react';

const WriteCommentPage = ({
  history,
  createPost,
  createPostError,
  clearCreateErr,
  linkTo,
}) => {
  const [submitData, setSubmitData] = useState({ title: '', author: '', body: '' });
  const { author, title, body } = submitData;

  const onChange = (e) => {
    setSubmitData({
      ...submitData,
      [e.target.name]: e.target.value,
    });
  };

  const postComment = (e) => {
    e.preventDefault();
    createPost({
      title,
      author,
      body,
    });
  };

  useEffect(() => {
    if (createPostError) alert('發文失敗，請稍後再試');
    if (linkTo) history.push('/articles');
    return () => {
      clearCreateErr();
    };
  }, [clearCreateErr, createPostError, history, linkTo]);

  return (
    <div>
      <form className="writeComment__form" onSubmit={postComment}>
        <label className="writeComment__label" htmlFor="author">您的名子：</label>
        <input className="writeComment__input" value={author} onChange={onChange} id="author" name="author" />

        <label className="writeComment__label" htmlFor="title">文章標題：</label>
        <input className="writeComment__input" value={title} onChange={onChange} id="title" name="title" />

        <label className="writeComment__label" htmlFor="article-body">內文：</label>
        <textarea className="writeComment__textarea" value={body} onChange={onChange} id="article-body" name="body" rows="50" />

        <div className="flex-end">
          <button className="writeComment__submit" type="submit">發文囉</button>
        </div>
      </form>
    </div>
  );
};

export default WriteCommentPage;
