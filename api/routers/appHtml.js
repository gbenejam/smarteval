const express = require("express");
const path = require('path')

const router = new express.Router();


// return always index.html
router.get('/*', (req, res) => {
  console.log('hola')
  const indexPath = path.resolve(__dirname, '../build', 'index.html');
  console.log('GET index.html : ' + indexPath);
  res.sendFile(indexPath);
});

module.exports = router;