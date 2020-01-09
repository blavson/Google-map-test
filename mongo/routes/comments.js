const express = require('express');
const { getComments, addComment } = require('../controllers/comments');
router = express.Router();

router.route('/').get(getComments).post(addComment);
router.route('/:markerId').get(getCommentsById);

module.exports = router
