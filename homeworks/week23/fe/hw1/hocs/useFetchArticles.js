import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchArticles = (match, history) => {
  const [blog, setBlog] = useState({ contents: [] })
  const [ori, setOri] = useState(false)

  const { contents } = blog;

  const myFetch = async (id) => {
    const response = await axios.get(`https://qootest.com/posts/${id}`)
    const jsonData = await response.data;
    setBlog({ ...blog, contents: jsonData,  });
  };

  const setApi = async (options, id, data) => {
    try {
      const response = await axios({
        method: options,
        url: `https://qootest.com/posts/${id}`,
        data,
      })
      if (options !== 'PUT') history.push('/articles')
    } catch (e) {
      if (options === 'POST') alert('發文失敗，請稍後再試');
      if (options === 'PUT') {
        alert('編輯失敗，請稍後再試')
        return setOri(!ori)
      }
      if (options === 'DELETE') {
        alert('刪除失敗，請稍後再試')
        return setOri(!ori)
      }
    }
 };

  const onChangeText = (e) => {
    setBlog({
      contents: {
        ...contents,
        [e.target.id]: e.target.value
      }
    })
  }

  useEffect(() => {
    const id = match.params.id || '';
    myFetch(id);
  }, [ori]);

  return { contents, setBlog, ori, setOri, setApi, onChangeText };
}
