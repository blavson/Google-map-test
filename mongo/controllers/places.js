const Place = require('../models/Place');

getPlaces =  async (req, res, next)=> {
 try {
   const places = await Place.find();
   return res.status(200).json({
      success : true,
      count : places.length,
      data : places
  })

 } catch (error) {
   console.error(error);
   res.status(500).json({error : 'Error happened'});
 }
}


addPlace =  async (req, res, next)=> {
  try {
       const place =  await Place.create(req.body);
       return res.status(201).send(place);
      console.log(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({error : 'Error happened'});
  }
 }

module.exports =  {getPlaces , addPlace }
