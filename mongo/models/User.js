const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')  

const authSchema = new Schema({
    email: {
      type: String,
     required: true,
     unique : true
  },
    password : {
      type: String,
     required: true
  },
});

authSchema.plugin(uniqueValidator);


//commentSchema.pre('save', async function (next) {})

const User = mongoose.model('User', authSchema);

module.exports = User
