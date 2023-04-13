import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            fullName: req.body.fullName,
            passwordHash: hash,
            favourites: req.body.favourites,
        })

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        }, 'secretkey123', {
            expiresIn: '14d',
        }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed registration.',
        })
    }

}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Wrong login or password.',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Wrong login or password.',
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secretkey123', {
            expiresIn: '14d',
        }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed login.',
        })
    }
}

export const profile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User is not found.'
            })
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'No access.',
        })
    }
}
export const update = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }


    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User is not found.'
            })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await UserModel.findOneAndUpdate(
            {
                _id: req.userId,
            },
            {
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                fullName: req.body.fullName,
                passwordHash: hash,
            },
            {
                returnDocument: 'after',
            }
        ).then((user) => {
            res.json(user._doc);
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed update info.',
        })
    }
}

export const addFavourite = async (req, res) => {
    try {

        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User is not found.'
            })
        }

        await UserModel.findOneAndUpdate(
            {
                _id: req.userId,
            },
            {
                $addToSet: { favourites: req.body._id },
            },
            {
                returnDocument: 'after',
            }
        ).then((user) => {
            res.json(user._doc);
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'No access.',
        })
    }
}


export const removeFavourite = async (req, res) => {
    try {

        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User is not found.'
            })
        }

        await UserModel.findOneAndUpdate(
            {
                _id: req.userId,
            },
            {
                $pull: { favourites: req.body._id },
            },
            {
                returnDocument: 'after',
            }
        ).then((user) => {
            res.json(user._doc);
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'No access.',
        })
    }
}
