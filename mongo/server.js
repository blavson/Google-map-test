const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');


require('dotenv').config();
app.use(express.json(), cors(), fileupload());
app.use(express.static('./public'));
app.use('/api/v1/places', require('./routes/places'));
app.use('/api/v1/comments', require('./routes/comments'));

connectDB();

// const db = mongoose.connection;
// db.on('error', (error) => console.error(error))
// // db.once('open', () => console.log('connected to database'))

app.listen(3000, () => console.log('server started'));
