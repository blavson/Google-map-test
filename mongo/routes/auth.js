const express = require('express');
const auth = require('../controllers/auth');
router = express.Router();

///router.route('/:placeId').get(getCommentsById);
router.route('/').get(auth.getUsers);
router.route('/signup').post(auth.signupUser)
router.route('/login').post(auth.loginUser)


module.exports = router
