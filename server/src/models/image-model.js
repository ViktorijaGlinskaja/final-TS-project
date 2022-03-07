import Mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const imageSchema = new Mongoose.Schema({
  src: {
    type: 'string',
    unique: true,
  },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

imageSchema.plugin(uniqueValidator);

const ImageModel = Mongoose.model('Image', imageSchema);

export default ImageModel;