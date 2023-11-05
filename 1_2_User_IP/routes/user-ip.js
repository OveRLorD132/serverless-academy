const UserIP = require('../module/UserIP');

let userIpFormatter = new UserIP();

let router = require('express').Router();

router.get('/ip', async(req, res) => {
  let userIp = req.header('x-forwarded-for');
  res.send(userIpFormatter.getIpCountry(userIp));
})

router.get('/ip/req-body', async (req, res) => {
  let userIp = req.body.ip;
  if(!userIp) {
    res.status(400).send('Bad Request');
    return;
  }
  res.send(userIpFormatter.getIpCountry(userIp));
})

module.exports = router;