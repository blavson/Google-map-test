const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
//const placeConstroller = require('./controllers/places');
//const authController = require('./controllers/auth');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/static/',express.static('./images/uploads/'))
app.use(cors());

require('dotenv').config();
app.use(express.json());
app.use('/api/v1/places', require('./routes/places'));
app.use('/api/v1/comments', require('./routes/comments'));
app.use('/api/v1/users', require('./routes/auth'));

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

connectDB();

// const db = mongoose.connection;
// db.on('error', (error) => console.error(error))
// // db.once('open', () => console.log('connected to database'))

app.listen(3000, () => console.log('server started'));
