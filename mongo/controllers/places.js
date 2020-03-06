const Place = require('../models/Place');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + MIME_TYPE_MAP[file.mimetype]);
  }
});

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

const  myUpload = multer({ storage : storage }).single('myimage');

addPlace = ('/', myUpload,  async(req, res, next) => {
  try {
      // const image = req.files.image;
      // console.log(image);
      // console.log(req.body, image);

     res.status(201).json({ success : true});
  } catch (error) {
    res.status(500).json({ error: 'Can\'t Add Place' });
  }
});


// addPlace =  async(req, res, next) => {
//    console.log(req.body);
// }

module.exports = { getPlaces, addPlace  }
