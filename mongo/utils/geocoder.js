const fetch = require('node-fetch');

const customGeocoder = (address) => {
let partial_url = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
let normalized_address = address.split(' ').join('+');
const url = partial_url + normalized_address  + '&key=' + process.env.GEOCODER_API_KEY;
//const url=`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
//+Mountain+View,+CA&key=` + process.env.GEOCODER_API_KEY;

return fetch(url)
   .then(response => response.json())
      .then(data => data.results[0])
.catch(err=> {
   console.log(err.message);
});
}

module.exports = customGeocoder
