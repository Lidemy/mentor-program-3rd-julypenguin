import axios from 'axios';

const instance = axios.create({ baseURL: 'https://qootest.com/posts' });

export const createPost = values => instance.post('', values);
export const getPost = id => instance.get(`/${id}`);
export const getPostList = () => instance.get('?_sort=id&_order=desc');
export const deletePost = id => instance.delete(`/${id}`);
export const updatePost = (id, value) => instance.put(`/${id}`, value);
