let jwt = require('jsonwebtoken');

module.exports = function signIn (user) {
  let refreshToken = jwt.sign(user, process.env.SECRET);
  let accessToken = jwt.sign(user, process.env.SECRET, { expiresIn: process.env.TTL });
  return { refreshToken, accessToken };
}