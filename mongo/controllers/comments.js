const Comment = require('../models/Comment');
const url = require('url');

getComments = async (req, res, next) => {
  try {
    const placeId = req.query.id;
    const page = parseInt(req.query.page);

    if (page < 0) {
        return res.status(500).json({
                                    success :false,
                                    count  :  0,
                                    comments : []
                                });
    }
    const size = 6;
    const skip=size*(page -1);
    const total = await Comment.find({ 'placeId': placeId });
    let query = {};
    query.skip = skip;
    //query.skip=20;
    query.limit = size;
    const comments = await Comment.find({ 'placeId': placeId },{}, query);
    console.log("getComments nodejs");
    return res.status(200).json({
                                success : true,
                                count   :  total.length,
                                comments : comments
                            });
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
