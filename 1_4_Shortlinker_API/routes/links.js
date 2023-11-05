let router = require('express').Router();

let Validator = require('../module/Validator');

let ShortLinks = require('../module/PG/ShortLinks');

router.post('/add-link', async (req, res) => {
  let { link } = req.body;
  try {
    await Validator.prototype.validateLink(link);
    let shortLink = await ShortLinks.prototype.addLink(link);
    res.status(200).send(`${process.env.SERVER}://${process.env.DOMAIN}:${process.env.PORT}/${shortLink}`);
  } catch(err) {
    if(err.message !== 'Link is too long' || err.message !== 'Invalid link') {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(400).send(err.message);
    }
  }
})

router.get('*', async (req, res) => {
  let shortLink = req.path;
  shortLink = shortLink.substring(1);
  try {
    let shortLinkObj = await ShortLinks.prototype.getLinkByShort(shortLink);
    if(!shortLinkObj) res.status(404).send('Not Found');
    else res.redirect(shortLinkObj.original_link);
  } catch(err) {
    res.status(500).send('Internal Server Error');
  }
})

module.exports = router;