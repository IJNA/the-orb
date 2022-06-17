const router = require("express").Router();
require("dotenv").config();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  res.render("homepage.html");
});

router.get("/api/bookpage/", (req, res) => {
  fetch(
    `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/chapters/GEN.1?include-verse-numbers=false`,
    {
      headers: process.env.API_KEY,
    }
  )
    .then((response) => {
      return response.json(); // parses response to only give use the data we want
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

