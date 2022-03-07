import Mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = Mongoose.Schema;

const contentSchema = new Mongoose.Schema({
    title: {
        type: 'string',
        required: true,
    },
}, {
    timestamps: true,
});

contentSchema.plugin(uniqueValidator);

const ContentSchema = Mongoose.model('Content', contentSchema);

export default ContentSchema;
