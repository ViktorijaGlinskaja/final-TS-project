import Mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = Mongoose.Schema;

const businessSchema = new Mongoose.Schema({
    title: {
        type: 'string',
        required: true,
    },
}, {
    timestamps: true,
});

businessSchema.plugin(uniqueValidator);

const BusinessSchema = Mongoose.model('Business', businessSchema);

export default BusinessSchema;