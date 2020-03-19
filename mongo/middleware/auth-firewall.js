const jwt = require('jsonwebtoken')

module.exports=async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log('auth-firewall token = ', token);
    await jwt.verify(token,'passphrase')
    next()
  }catch(err) {
    res.status(401).json({message : "Auth failed"})

  }


}