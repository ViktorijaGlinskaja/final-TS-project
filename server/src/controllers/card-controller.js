import CardModel from '../models/card-model.js';

export const postCards = async (req, res) => {
    const cardDoc = req.body;
    const cardDocs = await CardModel.create(cardDoc, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
};

export const getCards = async (req, res) => {
    await CardModel.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};