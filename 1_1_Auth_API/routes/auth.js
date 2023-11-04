let router = require('express').Router();

let { validateEmail, validatePassword } = require('../module/validation/validate-user-data');

let Users = require('../module/PG/Users');

let bcrypt = require('bcrypt');
const signIn = require('../module/Auth/sign-in');

router.post('/auth/sign-in', async (req, res) => {
  let { email, password } = req.body;
  if(!email || !password) {
    res.status(400).send({ success: false, error: "Missing Credentials"});
    return;
  }
  let user = await Users.prototype.getUser(email);
  if(!user || !await bcrypt.compare(password, user.password)) {
    res.status(404).send({ success: false, error: "Not Found"});
    return;
  }
  delete user.password;
  let { refreshToken, accessToken } = signIn(user);
  res.status(200).send({ success: true, data: { id: user.id, refreshToken, accessToken }})
})

router.post('/auth/sign-up', async (req, res) => {
  let { email, password } = req.body;
  if(!email || !password) {
    res.status(400).send({ success: false, error: "Missing Credentials"});
    return;
  }
  if(!validateEmail(email) || !validatePassword(password)) {
    res.status(400).send({ success: false, error: "Bad Request. Validation Error"});
    return;
  }
  try {
    let user = await Users.prototype.addUser(email, password);
    delete user.password;
    let { refreshToken, accessToken } = signIn(user);
    res.status(201).send({ success: true, data: { id: user.id, accessToken, refreshToken } });
  } catch(err) {
    if(err.constraint === 'email_unique') res.status(409).send({ success: false, error: "Conflict. Email must be unique"});
    else res.status(500).send("Internal Server Error");
  }
})

module.exports = router;