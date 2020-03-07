const Place = require('../models/Place');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

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


addPlace =   async(req, res, next) => {
  try {
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
        cb(null, req.id + '_logo.' + MIME_TYPE_MAP[file.mimetype]);
      }
    })
     
      const upload= multer({storage:storage}).single('myimage');
    
      const place = new Place(req.body);
      req.id = place._id;

      upload(req, res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        } else {
           res.end("File has been uploaded");
        }
    });
     res.status(201).json({ id : place._id});
  } catch (error) {
    res.status(500).json({ error: 'Can\'t Add Place' });
  }
};

module.exports = { getPlaces, addPlace  }
