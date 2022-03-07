import Mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import validator from 'validator';
const Schema = Mongoose.Schema;

const userSchema = new Mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: () => 'incorrect email format',
        },
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
        validate: [
            { validator: (value) => value.length >= 8, message: 'Min 8 characters' },
            { validator: (value) => value.length <= 32, message: 'Max 32 characters' },
            { validator: (value) => /^.*[0-9].*$/.test(value), message: 'At least one number' },
            { validator: (value) => /^.*[A-ZĄČĘĖĮŠŲŪŽ].*$/.test(value), message: 'At least one capital letter' },
        ],
    },
    role: {
        type: 'string',
        required: true,
        enum: ['CREATOR', 'SEEKER'],
    },
    country: {
        type: 'string',
    },
    content: [{
        type: Schema.Types.ObjectId,
        ref: 'Content'
    }],
    page: {
        type: 'string',
    },
    about: {
        type: 'string',
    },
    business: [{
        type: Schema.Types.ObjectId,
        ref: 'Business'
    }],
}, {
    timestamps: true,
});

userSchema.plugin(uniqueValidator);

const UserModel = Mongoose.model('User', userSchema);

export default UserModel;
