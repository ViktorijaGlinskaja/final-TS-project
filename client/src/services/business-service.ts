import axios from 'axios';
import BusinessCategory from 'types/business-category';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Business-Type': 'application/json',
  },
});

const getBusinessCategories = async (): Promise<BusinessCategory[]> => {
  const { data } = await instance.get<BusinessCategory[]>('/business');
  return data;
};

const API = {
  getBusinessCategories,
};

export default API;
