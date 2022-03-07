import UserModel from '../models/user-model.js';
import ImageModel from '../models/image-model.js';
import ImageViewModel from '../view-models/image-view-model.js';
import UserViewModel from '../view-models/user-view-model.js';

export const getUsers = async (req, res) => {

  const { email } = req.user;
  const userDoc = await UserModel.findOne({ email })
    .populate('content')
    .populate('business');
  let userDocs;
  if (userDoc.role === 'CREATOR') {
    userDocs = await UserModel.find({ role: 'SEEKER' })
  } else {
    // SEEKER
    userDocs = await UserModel.find({
      role: 'CREATOR',
      content: { $in: userDoc.content },
    })
  }

  const users = userDocs.map(userDoc => new UserViewModel(userDoc));

  const userWithImages = await Promise.all(users.map(async (user) => ({
    ...user,
    images: (await ImageModel.find({ user: user.id}))
      .map(x => new ImageViewModel(x))
  })))

  res.status(200).json(userWithImages);
};

export const updateUser = async (req, res) => {
  const userDoc = await UserModel.findOneAndUpdate(
    { email: req.user.email },
    req.body,
    { new: true },
  ).populate('business')
    .populate('content')

  res.status(200).json(new UserViewModel(userDoc));
}
