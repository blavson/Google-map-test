const express = require('express');
const { getPlaces, addPlace, imgMiddleWare } = require('../controllers/places');
router = express.Router();

router.route('/').get(getPlaces).post(imgMiddleWare, addPlace);

module.exports = router
