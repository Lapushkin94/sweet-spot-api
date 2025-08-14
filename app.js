const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users-routes');
const placeRoutes = require('./routes/places-routes');
const HttpError = require('./modules/http-error');


const app = express();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);

app.use((req, res, next) => {
    return next(new HttpError('no routes found', 404));
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    };

    res.status(error.code || 500);
    res.json({ message: error.message || 'unknown error' });
})

app.listen(5001);