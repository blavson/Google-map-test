const Comment = require('../models/Comment');
const url = require('url');

getComments = async (req, res, next) => {
  try {
<<<<<<< HEAD
      const placeId = req.query.id;
      console.log(placeId);

    const comments = await Comment.find({'placeId' : placeId});
=======
    const placeId = req.query.id;
    const comments = await Comment.find({ placeId: placeId });

>>>>>>> comment-style-box
    return res.status(200).json(comments);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error happened' });
  }
}


addComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    return res.status(201).send(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error happened' });
  }
}

module.exports = { getComments, addComment }
