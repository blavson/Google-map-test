const express = require('express');
const { getPlaces, addPlace, setImageStorage } = require('../controllers/places');
router = express.Router();


router.route('/').get(getPlaces).post(setImageStorage).post(addPlace);

module.exports = router
