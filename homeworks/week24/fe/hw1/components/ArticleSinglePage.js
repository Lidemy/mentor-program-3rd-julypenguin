import React, { useState, useEffect, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../highlight';
import Loading from '../loading/Loading';

const ArticleSinglePage = ({
  history,
  match,
  post,
  getPost,
  updatePost,
  deletePost,
  isLoadingGetPost,
  isLoadingUpdatePost,
  isRequestAgain,
  getPostError,
  updatePostError,
  deletePostError,
  clearDeleteErr,
  linkTo,
}) => {
  const [text, setText] = useState({ title: '', body: '' });
  const [edit, setEdit] = useState(false);

  const { title, body, author } = post;
  const { title: titleText, body: bodyText } = text;

  const { id } = match.params;

  const handleEdit = () => {
    setEdit(!edit);
  }

  const handleCancel = () => {
    handleEdit();
  }

  const handleDelete = () => {
    const isDelete = window.confirm('真的要刪除嗎？')
    if (isDelete) {
      deletePost(id);
    }
  }

  const handleUpdate = () => {
    updatePost(id, {
      title: titleText,
      body: bodyText,
    });
    handleEdit();
  }

  const onChangeText = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (!linkTo) {
      getPost(id);
      setText({title, body});
    }
    if (updatePostError) alert('更新失敗，請稍後再試');
    if (deletePostError) alert('刪除失敗，請稍後再試')
    if (linkTo) history.push('/articles');
    return () => {
      clearDeleteErr()
    }
  }, [
    history,
    getPost,
    id,
    title,
    body,
    updatePostError,
    deletePostError,
    clearDeleteErr,
    isRequestAgain,
    linkTo,
  ])

  return (
    <div className="article-card">
    { getPostError && <h1 className="err">好像出了點問題，晚點再來逛吧！</h1>}
      <div className="article__content">
        { (isLoadingGetPost || isLoadingUpdatePost) ? <Loading/> :
          !edit 
            ? <Fragment>
                <h3>作者：{author}</h3>
                <h1 className="article__content-title" >{ title }</h1>
                <ReactMarkdown 
                  className="article__content-body"
                  source={body}
                  renderers={{ code: CodeBlock }}
                />
              </Fragment>
            : <Fragment>
                <textarea className="article__content-title" value={titleText}  name="title" onChange={onChangeText} />
                <textarea className="article__content-body" rows="12" value={bodyText} name="body" onChange={onChangeText} />
              </Fragment>
        }
        <div className="option__btn">
          <div className="back__btn" onClick={() => {
            
            history.push('/articles')
          }}>上一頁</div>
          <div>
            {
              !edit
                ? <Fragment>
                    <div className="edit__btn" onClick={handleEdit}>編輯</div>
                    <div className="del__btn"　onClick={handleDelete}>刪除</div>
                  </Fragment>
                : <Fragment>
                    <div className="ok__btn" onClick={handleUpdate}>確認</div>
                    <div className="cancel__btn" onClick={handleCancel}>取消</div> 
                  </Fragment>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSinglePage;
