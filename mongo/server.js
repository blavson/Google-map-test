const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const controller = require('./controllers/places');


app.use(cors());

require('dotenv').config();
app.use(express.json());
app.use(express.static('./public'));
//app.use('/api/v1/places', require('./routes/places'));
app.use('/api/v1/comments', require('./routes/comments'));


app.post('/api/v1/places',  controller.addPlace);

connectDB();

// const db = mongoose.connection;
// db.on('error', (error) => console.error(error))
// // db.once('open', () => console.log('connected to database'))

app.listen(3000, () => console.log('server started'));
