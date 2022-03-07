import ContentModel from '../models/content-model.js';
import ContentViewModel from '../view-models/content-view-model.js';

export const getContentCategories = async (req, res) => {
  const ContentDocs = await ContentModel.find();
  const ContentCategories = ContentDocs.map(Content => new ContentViewModel(Content));
  res.status(200).json(ContentCategories);
};

export const createContentCategory = async (req, res) => {
  const ContentDoc = await ContentModel(req.body);
  try {
    await ContentDoc.save();
    const Content = new ContentViewModel(ContentDoc);
    res.status(201).json(Content);
  } catch (error) {
    res.status(400).json({
      message: `Error: the same category name already exists`,
    });
  }
};

export const getContentCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const ContentDoc = await ContentModel.findById(id);
    const Content = new ContentViewModel(ContentDoc);
    res.status(200).json(Content);
  } catch (error) {
    res.status(404).json({
      message: `Category with id: ${id} is not found`,
    });
  }
};

export const deleteContentCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const ContentDoc = await ContentModel.findByIdAndDelete(id);
    const Content = new ContentViewModel(ContentDoc);
    res.status(200).json(Content);
  }
  catch (error) {
    console.log(error.message)
    res.status(404).json({
      message: `Category with id: ${id} is not found`,
    });
  }
};

export const updateContentCategory = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    await ContentModel.findById(id);

    try {
      const ContentDoc = await ContentModel.findByIdAndUpdate(
        id,
        { title },
        { new: true }
      );
      const Content = new ContentViewModel(ContentDoc);
      res.status(200).json(Content);
    } catch (error) {
      res.status(400).json({ message: 'Bad data' });
    }

  } catch (error) {
    res.status(404).json({ message: 'Category not found' });
  }
};

export const replaceContentCategory = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    await ContentModel.findById(id);

    try {
      const ContentDoc = await ContentModel.findOneAndReplace(
        id,
        { title },
        { new: true }
      );
      const Content = new ContentViewModel(ContentDoc);
      res.status(200).json(Content);
    } catch (error) {
      res.status(400).json({ message: 'Bad data' });
    }

  } catch (error) {
    res.status(404).json({ message: 'Category not found' });
  }
};
