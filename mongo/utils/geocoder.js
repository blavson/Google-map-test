const fetch = require('node-fetch');

const geocoder = (address) => {
let partial_url = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
let normalized_address = address.split(' ').join('+');
const url = partial_url + normalized_address  + '&key=' + process.env.GEOCODER_API_KEY;
fetch(url)
   .then(response => response.json())
      .then(data =>{
         console.log(data);
         return data;
      })
.catch(err=> {
   console.log(err.message);
});
}

module.exports=geocoder
