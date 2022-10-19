const express = require('express');
const router = express.Router()

router.get("/", (req, res) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET');
  res.send("server is up!");
});

module.exports = router;