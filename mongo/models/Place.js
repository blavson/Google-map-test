const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customGeocoder = require('../utils/geocoder');

const placeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },

    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,

  },
  description: String,
  infoWindow: String,
  image: String,
  icon: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});

placeSchema.pre('save', async function (next) {
  const loc = await customGeocoder(this.address);

  this.location = {
    type: 'Point',
    coordinates:  [loc.geometry.location.lng ,loc.geometry.location.lat],
    formattedAddress: loc.formatted_address
  }
  this.neighborhood = loc.neighborhood;
  this.rating = 0;
  this.image =   this._id + '/' + 'thumbnail.jpg';
  this.infoWindow = "<div id='iw-container'><div class='iw-title'>" + this.name + '</div>' +
  "<div class='iw-content'><div class='iw-subTitle'>" + this.address + '</div>' +
  "<p>" + this.description + "</p>" +
  `<img src="http://localhost:3000/static/${this.image}"  width="300" height="161">`+
  "<div class='iw-subTitle'>Contacts</div> <p><br>" +
  "Some contacts here" + "</p></div>" +
  " <div class='iw-bottom-gradient'></div> </div>";
  
  //this.infoWindow = `<img src='localhost:3000/static/${this.image}'>`;
  console.log('PREEEE', this);

})


const Place = mongoose.model('Place', placeSchema);

module.exports = Place
