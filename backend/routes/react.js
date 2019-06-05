const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

router.get('/auth/*',(req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

router.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

module.exports = router;
