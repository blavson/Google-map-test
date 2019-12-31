const express = require('express');
const mongoose = require('mongoose');
const Place = require('./models/place');
const app= express();
require('dotenv').config();


app.use((re, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Acccess-Control-Allow-Headers', 'Origin,X-request-With, Content-Type, Accept');
  next();
});
app.get('/api/places', async(req, res) => {
    place = await db.collection('places').findOne();
    res.json(place);
})

mongoose.connect(process.env.DATABASE_URL,
 { useNewUrlParser: true ,  useUnifiedTopology: true  } );
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.listen(3000, () => console.log('server started'));




