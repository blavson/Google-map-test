const express = require('express');
const mongoose = require('mongoose');
const Place = require('./models/place');
const app= express();
require('dotenv').config();


app.get('/api/places', async(res, req, next) => {
    place = await db.collection('places').findOne();
    console.log(place);
 return place;
})

mongoose.connect(process.env.DATABASE_URL,
 { useNewUrlParser: true ,  useUnifiedTopology: true  } );
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.listen(3000, () => console.log('server started'));




