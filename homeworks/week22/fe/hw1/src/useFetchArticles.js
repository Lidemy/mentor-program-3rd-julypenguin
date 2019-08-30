import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchArticles = (match) => {
  const [blog, setBlog] = useState({ contents: [] })

   const myFetch = async (id) => {
    const response = await axios.get(`https://qootest.com/posts/${id}`)
    const jsonData = await response.data;
    setBlog({ ...blog, contents: jsonData });
  };

  useEffect(() => {
    const id = match.params.id || '';
    myFetch(id);
  }, []);

  return blog;
}
