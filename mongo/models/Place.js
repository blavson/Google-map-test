const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const geocoder = require('../utils/geocoder');

const placeSchema = new Schema({
  name:  { 
          type : String,
          required : true
        }, 
  address:{
          type : String,
          required : true
        },
  neighborhood : String,      
  location: {
          type: {
            type: String, 
            enum: ['Point'], 
          },
          coordinates: {
            type: [Number],
            index : '2dsphere'
          },
          formattedAddress : String,
   },
  icon : String,
  rating : Number,
  description : String,
  createdAt : { type : Date, default: Date.now}
});

placeSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location =  {
    type : 'Point',
    coordinates : [loc[0].longitude, loc[0].latitude],
    formattedAddress : loc[0].formattedAddress
  }
  this.neighborhood = loc[0].neighborhood;
  console.log(loc);

})
const Place = mongoose.model('Place', placeSchema);

module.exports= Place