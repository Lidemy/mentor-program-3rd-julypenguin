import React, { useState, Fragment } from 'react';
import { useFetchArticles } from './hocs/useFetchArticles';

const ArticleSinglePage = ({ history, match, toNav }) => {
  const { contents, ori, setOri, setApi, onChangeText } = useFetchArticles(match, history);
  const [edit, setEdit] = useState(false)

  const { title, author, body } = contents
  const id = match.params.id;

  const handleEdit = () => {
    setEdit(!edit);
  }

  const cancelEdit = () => {
    handleEdit()
    setOri(!ori)
  }

  const handleDelete = () => {
    setApi('DELETE', id)
    toNav('文章列表')
  }

  const handleUpdate = () => {
    const data = {
      title: title,
      author: author,
      body: body,
    }
    setApi('PUT', id, data)
    handleEdit()
  }

  return (
    <div className="article-card">
      <div className="article__content">
        { 
          !edit 
            ? <Fragment>
                <h1 className="article__content-title" >{ title }</h1>
                <p className="article__content-body" >{ body }</p>
              </Fragment>
            : <Fragment>
                <textarea className="article__content-title" value={title} onChange={onChangeText} id="title" />
                <textarea className="article__content-body" rows="12" value={body} onChange={onChangeText} id="body" />
              </Fragment>
        }
        <div className="option__btn">
          <div className="back__btn" onClick={() => {
            toNav('文章列表')
            history.push('/articles')
          }}>上一頁</div>
          <div>
            {
              !edit
                ? <Fragment>
                    <div className="edit__btn" onClick={() => handleEdit()}>編輯</div>
                    <div className="del__btn"　onClick={() => handleDelete()}>刪除</div>
                  </Fragment>
                : <Fragment>
                    <div className="ok__btn" onClick={() => handleUpdate() }>確認</div>
                    <div className="cancel__btn" onClick={() => cancelEdit()}>取消</div> 
                  </Fragment>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSinglePage;
