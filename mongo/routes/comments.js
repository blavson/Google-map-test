const express = require('express');
const { getComments, addComment } = require('../controllers/comments');
router = express.Router();
const authfirewall = require('../middleware/auth-firewall')
///router.route('/:placeId').get(getCommentsById);
router.route('/').get(getComments).post(authfirewall).post(addComment);

module.exports = router
