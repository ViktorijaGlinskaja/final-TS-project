import BusinessModel from '../models/business-model.js';
import BusinessViewModel from '../view-models/business-view-model.js';

export const getBusinessCategories = async (req, res) => {
  const BusinessDocs = await BusinessModel.find();
  const BusinessCategories = BusinessDocs.map(Business => new BusinessViewModel(Business));
  res.status(200).json(BusinessCategories);
};

export const createBusinessCategory = async (req, res) => {
  const BusinessDoc = await BusinessModel(req.body);
  try {
    await BusinessDoc.save();
    const Business = new BusinessViewModel(BusinessDoc);
    res.status(201).json(Business);
  } catch (error) {
    res.status(400).json({
      message: `Error: the same category name already exists`,
    });
  }
};
