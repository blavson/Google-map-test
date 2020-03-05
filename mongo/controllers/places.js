const Place = require('../models/Place');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

/*
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid File Type");
      if (isValid) {
         error = null;
      }
      cb(error, './public/');
   },
    filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      const fname = name + '-' + Date.now() + '.' + ext;
      console.log(fname);
       cb(null, fname);
    }
  });
*/


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     console.log(req.files);
    cb(null, './public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

//const upload = multer({ dest : './public'});

getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    return res.status(200).json({
      success: true,
      count: places.length,
      data: places
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error happened' });
  }
}

const upload = multer({ storage : storage });
addPlace = (upload.single('myimage'), (req, res) => {
  try {
       //const image = req.files.image;
      // console.log(req.body, image);
      console.log('aaaa');

     res.status(201).json({ success : true});
  } catch (error) {
    res.status(500).json({ error: 'Can\'t Add Place' });
  }
});


// addPlace =  async(req, res, next) => {
//    console.log(req.body);
// }

module.exports = { getPlaces, addPlace  }
