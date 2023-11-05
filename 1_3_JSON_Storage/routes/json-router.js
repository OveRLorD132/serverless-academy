let router = require('express').Router();

let path = require('path');
const JSONServe = require('../module/JSON-serve');

let JSONServeObj = new JSONServe();


router.put('*', async (req, res) => {
  let JSONPath = formatPath(req.path);
  let JSONData = req.body;
  if(!Object.keys(JSONData)) {
    res.status(400).send('Bad Request. JSON required');
    return;
  }
  try {
    await JSONServeObj.addFile(JSONPath, JSONData);
    res.status(200).send('Success');
  } catch(err) {
    if(err.message === 'Invalid path') res.status(400).send(err.message);
    else res.status(500).send('Internal Server Error');
  }
})

router.get('*', async (req, res) => {
  let JSONPath = formatPath(req.path);
  try {
    let data = await JSONServeObj.getJSON(JSONPath);
    res.status(200).send(data);
  } catch(err) {
    console.log(err);
    res.status(400).send('Bad Request');
  }
})

function formatPath(path) {
  let pathArr = path.split('/');
  pathArr.shift();
  return pathArr;
}

module.exports = router;