const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  targetId: {
    type: String,
    required: true
  },
  userName: String,
  body: {
    type: String,
    required: true
  },
  rate: Number,
  ip: String,
  createdAt: { type: Date, default: Date.now }
});


//commentSchema.pre('save', async function (next) {})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment
