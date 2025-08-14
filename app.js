const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user-routes')
const placeRoutes = require('./routes/place-routes')

const app = express();

app.use('/users', userRoutes);
app.use('/places', placeRoutes);

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express! Empty route</h1>');
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || 'unknown error'});
})

app.listen(5001);