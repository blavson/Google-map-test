const express = require('express');
const { getPlaces, addPlace  } = require('../controllers/places');
router = express.Router();
const authfirewall = require('../middleware/auth-firewall')

router.route('/').get(getPlaces).post(authfirewall).post(addPlace);
//router.route('/').get(getPlaces).post(addPlace);

module.exports = router
