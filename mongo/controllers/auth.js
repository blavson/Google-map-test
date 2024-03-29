const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

signupUser = ( (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User ({
      email : req.body.email,
      password : hash
    });
    user.save().then(
      resp => res.status(201).json({success : true, resp : resp})
    ).catch(err => {
      res.status(500).json({status : false, message : 'Duplicate user'});
    })
  })
  .catch(err => {
    res.status(500).json({
      status : false,
      error : err
    })
  })
});

loginUser = ((req, res) => {
  console.log('login user : ', req.body);
  const email= req.body.email;
  User.findOne({'email': email}).then(user => {
    if (!user) {
     return  res.status(401).json({success : false, resp : "Can't locate user"})
    }
    bcrypt.compare(req.body.password, user.password , (err, result) => {
      if (result  === false )  {
        return  res.status(401).json({success : false, resp : "NO success"})   
      }
     const token = jwt.sign({email : user.email, id : user._id }, 'passphrase' , {expiresIn : '1h'});
     console.log('Auth.js token :' + token)
     return res.status(200).json({success : true, token : token , expiresIn : 3600}); 
});
}).catch(err => {
  return res.status(401).json({success : false , message : 'Unpredicted error'})
  });
})

getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error happened' });
  }
}


module.exports = {signupUser, loginUser, getUsers}