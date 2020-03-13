const Place = require('../models/Place');
const multer = require('multer');
const fs = require('fs')
const path = require('path')


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
         const new_file_name = req.file.destination + '/' + place.id + '/thumbnail'   +  path.extname(req.file.originalname) ;
         const old_file_name = req.file.destination + '/' + req.file.originalname; 

         if (!fs.existsSync(req.file.destination + '/' + place.id)) {
          fs.mkdirSync(req.file.destination + '/' + place.id, 0744);
         }
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

module.exports = { getPlaces, addPlace  }
