const express = require('express');
const { getPlaces, addPlace }   = require('../controllers/places');
router = express.Router();

router.route('/').get(getPlaces).post(addPlace);

module.exports=router
