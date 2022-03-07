import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  name: {
    type: 'string',
  },
  url: {
    type: 'string',
  }
});

const CardModel = mongoose.model('Card', cardSchema);

export default CardModel;
