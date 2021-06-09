const express = require("express");
const path = require('path')

const router = new express.Router();

router.get('/download/:file', async (req, res) => {
  try {
    const file = req.params.file;
    const filePath = path.resolve(__dirname, '../download', file);
    res.set({
      'Access-Control-Expose-Headers': 'Content-Disposition',
      'Content-Disposition': `attachment; filename="${file}"`,
      'Content-Type': 'application/zip'
    });
    console.log('Sending ' + filePath + '...');
    res.sendFile(filePath);
  } catch (error) {
    res.status(400).send('Error while downloading file');
  }
});

// return always index.html
router.get('*', (req, res) => {
  try {
    const indexPath = path.resolve(__dirname, '../build', 'index.html');
    console.log('GET index.html : ' + indexPath);
    res.sendFile(indexPath);
  } catch (error) {
    res.status(400).send('Error while downloading index.html');
  }
});

module.exports = router;