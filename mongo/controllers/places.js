const Place = require('../models/Place');
const multer = require('multer');
const fs = require('fs')
const path = require('path')


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


addPlace =  (req, res, next) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './images/uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    })
    
    const upload= multer({storage:storage}).single('myimage');
    
    upload(req,res,async (err) => {
        if(err) {
          return res.end("Error uploading file.");
        } else {
         const place = await new Place(req.body).save();
         console.log(place);

         const new_file_name = req.file.destination + '/' + place._id  +  path.extname(req.file.originalname) ;
         const old_file_name = req.file.destination + '/' + req.file.originalname; 

         fs.rename(old_file_name, new_file_name, function (err) {
           if (err) throw err
           console.log('Successfully renamed - AKA moved!')
         })         
        }
    });
    
     res.status(201).json({ success : true});
  } catch (error) {
    res.status(500).json({ error: 'Can\'t Add Place' });
  }
}


// addPlace =  async(req, res, next) => {
//    console.log(req.body);
// }

module.exports = { getPlaces, addPlace  }
