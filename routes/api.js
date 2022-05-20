const router = require("express").Router();
require('dotenv').config();
const fetch = require("node-fetch");

router.get("", (req, res) => {
  fetch(
    ``
  )
    .then(response => {
      return response.json(); // parses response to only give use the data we want
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;