let jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) { 
  let headers = req.headers;
  if(headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
    let token = headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err && err.name === 'TokenExpiredError') res.status(400).send('Token Expired');
      else if(err) res.status(400).send('Invalid Token');
      else {
        req.user = { email: decoded.email, id: decoded.id };
        next();
      } 
    });
  } else res.status(400).send("Missing Authentication Header");
}