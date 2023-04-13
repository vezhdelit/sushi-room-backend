import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './validations/auth.js';
import { itemCreateValidation } from './validations/item.js';
import { adCreateValidation } from './validations/ad.js';
import cors from 'cors';

import checkAuth from './utils/checkAuth.js';
import { register, login, profile, addFavourite, removeFavourite, update } from './controllers/UserController.js';
import { createItem, getAllItems, getOneItem } from './controllers/ItemController.js';
import { createAd, getAllAds } from './controllers/AdController.js';

mongoose
    .connect('mongodb+srv://admin:prototype28@sushi-room.io6uttd.mongodb.net/sushi-room?retryWrites=true&w=majority')
    .then(() => console.log('Database reached successfuly'))
    .catch((err) => console.log("Error. Can't reach database", err))

const app = express();
app.use(cors());
app.use(express.json());

////////////////

app.post('/auth/login', loginValidation, login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/profile', checkAuth, profile);

app.patch('/auth', registerValidation, checkAuth, update);
app.patch('/auth/addFavourite', checkAuth, addFavourite);
app.patch('/auth/removeFavourite', checkAuth, removeFavourite);

/////////////////////////////

app.post('/items', itemCreateValidation, createItem);
app.get('/items', getAllItems);
app.get('/items/:id', getOneItem);
// app.delete('/items', removeItem);
// app.patch('/items/:id', updateItem);

//////////////////////////////

app.post('/ads', adCreateValidation, createAd);
app.get('/ads', getAllAds);

app.listen(4444, (err) => {
    if (err) {
        return console.log("Error. Can't start server", err);
    }

    console.log('Server started successfuly');
});