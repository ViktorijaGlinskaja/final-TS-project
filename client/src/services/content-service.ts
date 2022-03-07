import axios from 'axios';
import ContentCategory from 'types/content-category';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getContentCategories = async (): Promise<ContentCategory[]> => {
  const { data } = await instance.get<ContentCategory[]>('/contents');
  return data;
};

const API = {
  getContentCategories,
};

export default API;
