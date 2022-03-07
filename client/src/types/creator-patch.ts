import ContentCategory from './content-category';

type CreatorPatch = {
  content: ContentCategory[],
  page: string,
  about: string,
  country: string,
};

export default CreatorPatch;
