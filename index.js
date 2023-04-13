import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidation, loginValidation } from './validations/auth.js';
import { register, login, profile, addFavourite, removeFavourite, update } from './controllers/UserController.js';
import checkAuth from './middleware/checkAuth.js';

import { itemCreateValidation } from './validations/item.js';
import { createItem, getAllItems, getOneItem } from './controllers/ItemController.js';

import { adCreateValidation } from './validations/ad.js';
import { createAd, getAllAds } from './controllers/AdController.js';


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Database reached successfuly'))
    .catch((err) => console.log("Error. Can't reach database", err))

const app = express();
app.use(express.json());
app.use(cors());

///////////////////////////////////////////////

app.get('/', (req, res) => {
    res.send('Server is up.');
});

////

app.post('/auth/login', loginValidation, login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/profile', checkAuth, profile);

app.patch('/auth', registerValidation, checkAuth, update);
app.patch('/auth/addFavourite', checkAuth, addFavourite);
app.patch('/auth/removeFavourite', checkAuth, removeFavourite);

////

app.post('/items', itemCreateValidation, createItem);
app.get('/items', getAllItems);
app.get('/items/:id', getOneItem);

////

app.post('/ads', adCreateValidation, createAd);
app.get('/ads', getAllAds);

//////////////////////////////////////////////

app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        return console.log("Error. Can't start server", err);
    }
    console.log('Server started successfuly');
});