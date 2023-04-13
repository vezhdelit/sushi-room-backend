import express from 'express'
import mongoose from 'mongoose';

import { itemCreateValidation } from './validations/item.js';
import { createItem, getAllItems, getOneItem } from './controllers/ItemController.js';

mongoose
    .connect('mongodb+srv://admin:prototype28@sushi-room.io6uttd.mongodb.net/sushi-room?retryWrites=true&w=majority')
    .then(() => console.log('Database reached successfuly'))
    .catch((err) => console.log("Error. Can't reach database", err))

const app = express();
app.use(express.json());

///////////////////////////////////////////////

app.get('/', (req, res) => {
    res.send('Server is up.');
});

app.post('/items', itemCreateValidation, createItem);
app.get('/items', getAllItems);
app.get('/items/:id', getOneItem);

//////////////////////////////////////////////

app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        return console.log("Error. Can't start server", err);
    }
    console.log('Server started successfuly');
});