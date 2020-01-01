const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app= express();
const connectDB = require('./config/db');

require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use('/api/v1/places', require('./routes/places'));

connectDB();

// const db = mongoose.connection;
// db.on('error', (error) => console.error(error))
// // db.once('open', () => console.log('connected to database'))

app.listen(3000, () => console.log('server started'));




