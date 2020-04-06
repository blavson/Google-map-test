const Place = require('../models/Place');
const multer = require('multer');
const fs = require('fs')
const path = require('path')



getTestRequest = async(req, res, next ) => {
  console.log('Get Test Request')
  const  lng = 41.709157; 
  const  lat =44.767054;
  const radius = 50
  const vicinity =  radius  /  6378;
  const plcs = await Place.find({location : {$geoWithin : { $centerSphere :  [ [lat, lng], vicinity] } } } )
  return res.status(200).json(({
    success: true,
    count: plcs.length,
    data: plcs
  }))
}

getPlaces = async (req, res, next) => {
 // let  { placeAddress} = req.params;
//  const  lng = 41.709157; 
//  const  lat = 44.767054;
 const vicinity =  process.env.RADIUS /6378;
 let  lat = parseFloat(req.query.lng);
 let  lng = parseFloat(req.query.lat);
 const placeAddress= req.query.address;

 if (isNaN(lat) && isNaN(lng)) {
     lng = 41.709157; 
     lat = 44.767054;
 }

  try {
    //console.log('query address= ' + req.query.address)
    if ( (placeAddress === undefined )|| (placeAddress === '') || isNaN(placeAddress)) {
      places = await Place.find({ location : {  $geoWithin :  { $centerSphere :  [ [lat, lng], vicinity] }   }  } );
    } else {
      console.log('PlaceAddress = '  + placeAddress)
      places = await Place.find(
         {
            $and : [
              { location : {  $geoWithin : 
              { $centerSphere :  [ [lat, lng], vicinity] } 
                           }  
              }, 
              {  
                 $or : [ 
                   { "address" : {"$regex": placeAddress, "$options": "i"} }, 
                   {"name" : {"$regex" : placeAddress, "$options" :"i"} } ,
                        ]      
              },
              ],
          },
      ).sort([ [{"name" : 1}], [{"address" : 1 }]])
    } 
    //   places = await Place.find();
    //   console.log('gePLaces : ', places);
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
         if (!req.file) {

           const destName = `images/uploads/${place.id}/thumbnail.png`

          if (!fs.existsSync( `images/uploads/${place.id}`)) {
            fs.mkdirSync(`images/uploads/${place.id}`, 0744);
           }

           fs.createReadStream('images/dummy_house.png')
            .pipe(fs.createWriteStream(destName)); 
          console.log('Filled with dummy house image')
         } else {
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
      }
    });
    
     res.status(201).json({ success : true});
  } catch (error) {
    res.status(500).json({ error: 'Can\'t Add Place' });
  }
}

module.exports = { getPlaces, addPlace  }
