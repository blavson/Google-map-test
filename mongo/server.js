const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const multer = require('multer')


app.use(cors());

require('dotenv').config();
app.use(express.json());
app.use(express.static('./public'));
//app.use('/api/v1/places', require('./routes/places'));
app.use('/api/v1/comments', require('./routes/comments'));

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + MIME_TYPE_MAP[file.mimetype]);
  }
})
 
var upload= multer({storage:storage}).single('myimage');

app.post('/api/v1/places', upload, (req, res, next) => {
  console.log(req.body);
})

connectDB();

// const db = mongoose.connection;
// db.on('error', (error) => console.error(error))
// // db.once('open', () => console.log('connected to database'))

app.listen(3000, () => console.log('server started'));
