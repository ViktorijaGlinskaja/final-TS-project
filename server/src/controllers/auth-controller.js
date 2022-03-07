import UserModel from '../models/user-model.js'
import UserViewModel from '../view-models/user-view-model.js';
import { hashPasswordAsync, comparePasswordsAsync } from '../helpers/hash.js';
import generateToken from '../helpers/generate-token.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { email, name, password, repeatPassword, role } = req.body;
    try {
        if (password !== repeatPassword) throw new Error('Password do not match');
        const userDoc = await UserModel.create({
            email,
            name,
            password,
            role,
        })
        const user = new UserViewModel(userDoc);
        res.status(201).json({
            user,
            token: generateToken({ email, role: userDoc.role }),
        });
        const hashedPassword = await hashPasswordAsync(password);
        await UserModel.findByIdAndUpdate(userDoc.id, {
            password: hashedPassword,
        })
            .populate('content')
            .populate('business');
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await UserModel.findOne({ email })
            .populate('content')
            .populate('business');
        const passwordsAreEqual = await comparePasswordsAsync(password, userDoc.password);
        if (passwordsAreEqual) {
            const user = new UserViewModel(userDoc);
            res.status(200).json({
                user,
                token: generateToken({ email, role: userDoc.role })
            });
        }
        else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        res.status(404).json({ message: 'Email not found' });
    }
}

export const auth = async (req, res) => {
    const { token } = req.body;
    try {
        const { email } = jwt.verify(token, process.env.TOKEN_SECRET);
        const userDoc = await UserModel.findOne({ email })
            .populate('content')
            .populate('business');
        const user = new UserViewModel(userDoc);
        res.status(200).json(user);
    } catch (error) {
        res.status(403).json({ message: 'Token not valid' });
    }
}

export const checkEmail = async (req, res) => {
    const { email } = req.query;
    if (!email) {
        res.status(400).json({
            message: 'Email already taken',
        });
        return;
    }
    const userDoc = await UserModel.findOne({ email })
        .populate('content')
        .populate('business');;
    res.status(200).json({ available: !userDoc });
}
