const router = require("express").Router();
require("dotenv").config();
const { log } = require("console");
const { response } = require("express");
const fetch = require("node-fetch");
const path = require('path');

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/homepage.html'));
});

router.get("/api/bookpage/:book", async (req, res) => {
  let chapters = 0;
  // let book = req.params.book;
  let book = 'GEN';
  console.log(book);
  fetch(
    `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/books/${book}/chapters`,
    {
      // method: 'GET',
      headers: { 'api-key': process.env.API_KEY },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(async (data) => {
      chapters = data.data.length;
      // console.log(data);
      // console.log(chapters);
      let promises = [];
      console.log(chapters);
      for (let i = 1; i < chapters; i++) {
        // console.log({ i, chapters });
        promises.push(fetch(
          `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/chapters/${book}.${i}?include-verse-numbers=false`,
          {
            // method: 'GET',
            headers: { 'api-key': process.env.API_KEY },
          }
        ).then(d => d.json()))
      }
      const result = await Promise.all(promises)
      // console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

