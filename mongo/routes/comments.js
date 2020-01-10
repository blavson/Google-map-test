const express = require('express');
const { getComments, addComment } = require('../controllers/comments');
router = express.Router();

//router.route('/:placeId').get(getCommentsById);
router.route('/').get(getComments).post(addComment);

module.exports = router
