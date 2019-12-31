const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name:  String, 
  address: String,
  position :  {
                latitude : Number,
                longitude :Number
    },
  icon : String,
  rating : Number,
  description : String,
  added_date : { type : Date, default: Date.now}
});

const Place = mongoose.model('Place', placeSchema);

module.exports= Place