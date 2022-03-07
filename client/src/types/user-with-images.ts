import User from './user';
import Image from './image';

type UserWithImages = User & {
  images: Image[]
};

export default UserWithImages;
