import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';

mongoose
    .connect('mongodb+srv://admin:prototype28@sushi-room.io6uttd.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Database reached successfuly'))
    .catch((err) => console.log("Error. Can't reach database", err))

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/auth/register', registerValidation, (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    res.json({
        success: true,
    });
});


app.listen(4444, (err) => {
    if (err) {
        return console.log("Error. Can't start server", err);
    }

    console.log('Server started successfuly');
});