import ImageModel from '../models/image-model.js';
import UserModel from '../models/user-model.js';
import ImageViewModel from '../view-models/image-view-model.js';
import { deleteFile } from '../helpers/file-helpers.js';

export const getImages = async (req, res) => {
  const userDoc = await UserModel.findOne({ email: req.user.email })
    .populate('content')
    .populate('business');
  const imageDocs = await ImageModel.find({ user: userDoc._id });

  const images = imageDocs.map(x => new ImageViewModel(x));

  res.status(200).json(images);
};

export const uploadImages = async (req, res) => {
  const userDoc = await UserModel.findOne({ email: req.user.email })
    .populate('content')
    .populate('business');
  const imgData = req.files.map(({ filename }) => ({
    src: filename,
    user: userDoc.id,
  }));

  const imgDocs = await ImageModel.insertMany(imgData);
  const images = imgDocs.map(x => new ImageViewModel(x));

  res.status(200).send(images);
}

export const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const imageDoc = await ImageModel.findById(id);

    const { PUBLIC_PATH, IMG_FOLDER_NAME } = process.env;
    const imgPath = `${PUBLIC_PATH}/${IMG_FOLDER_NAME}/${imageDoc.src}`;
    deleteFile(imgPath);

    await imageDoc.delete();

    res.status(200).send({
      message: 'Photo Successfully deleted',
      id,
    });


  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: 'Photo not found',
    });
  }
}
