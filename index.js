import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
    .connect('mongodb+srv://admin:prototype28@sushi-room.io6uttd.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Database reached successfuly'))
    .catch((err) => console.log("Error. Can't reach database", err))

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/auth/login', (req, res) => {

    const token = jwt.sign({
        email: req.body.email,
        fullName: req.body.fullName,
    }, 'secretkey123');

    res.json({
        success: true,
        token
    });
});


app.listen(4444, (err) => {
    if (err) {
        return console.log("Error. Can't start server", err);
    }

    console.log('Server started successfuly');
});