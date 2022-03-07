import ContentCategory from './content-category';
import BusinessCategory from './business-category';

type SeekerPatch = {
  content: ContentCategory[],
  business: BusinessCategory[],
  page: string,
  about: string,
  country: string,
};

export default SeekerPatch;
