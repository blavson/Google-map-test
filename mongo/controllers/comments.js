const Comment = require('../models/Comment');

getCommentsById = async (req, res, next) => {
  try {
    const comments = await Comment.find({ placeId: String(req.params.markerId) });
    return res.status(200).json(req);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error happened' });
  }
}

getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({});
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
