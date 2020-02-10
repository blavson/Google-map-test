const Place = require('../models/Place');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}



setImageStorage = async (req, res, next) => {
  /*
  const storage = multer.diskStorage({
    destination: (req, title, callb) => {

      if (MIME_TYPE_MAP[file.mimetype])
        new Error("Invalid mime type");
      else
        callb(null, 'mongo/images')
    },
    filename: (req, file, callb) => {
      const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      callb(null, name + '-' + Date.now() + '.' + ext);
    }
  });
*/
  console.log('setImageStorage');
  next();
}

imgMiddleWare = multer(this.setImageStorage).single("image");

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
  /*
    try {
      const place = await Place.create(req.body);
      return res.status(201).send(place);
      console.log(place);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error happened' });
    }*/
  console.log("AddPlace");
}

module.exports = { getPlaces, addPlace, imgMiddleWare }
