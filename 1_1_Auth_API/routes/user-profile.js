const auth = require('../module/middlewares/auth');

let router = require('express').Router();

router.get('/me', auth, async (req, res) => {
  res.status(200).send(req.user);
})

module.exports = router;