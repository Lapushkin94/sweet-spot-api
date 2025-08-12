const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user-routes')

const app = express();

app.use(userRoutes);

app.listen(5001);