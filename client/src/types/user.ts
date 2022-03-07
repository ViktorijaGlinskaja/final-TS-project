import BusinessCategory from 'types/business-category';
import ContentCategory from 'types/content-category';

type User = {
  id: string,
  email: string,
  role: 'SEEKER' | 'CREATOR',
  name: string,
  page: string,
  about: string,
  business?: BusinessCategory[],
  content?: ContentCategory[],
  country?: string,
  createdAt: string,
  updatedAt: string,
};

export default User;
