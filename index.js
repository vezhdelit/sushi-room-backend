import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        return console.log("Error. Can't start server", err);
    }
    console.log('Server started successfuly');
});