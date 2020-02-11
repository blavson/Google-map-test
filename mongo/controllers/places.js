const Place = require('../models/Place');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

setImageStorage =  (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (empty(MIME_TYPE_MAP[file.mimetype]))
        new Error("Invalid mime type");
      else
         cb(null, 'mongo/images/')
    },
    filename: (req, file, cb) => {
      const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
       cb(null, name + '-' + Date.now() + '.' + ext);
    }
  });
  console.log('setImageStorage');
};


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

addPlace = async (req, res, next) => {
  try {
    const place = await Place.create(req.body);
    return res.status(201).send(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error happened' });
  }
  console.log("AddPlace");
}

module.exports = { getPlaces, addPlace, setImageStorage }
