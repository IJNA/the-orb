const router = require("express").Router();
require("dotenv").config();
const { log } = require("console");
const { response } = require("express");
const fetch = require("node-fetch");
const path = require('path');
const bookInfo = require('../utils/bookInfo')

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/homepage.html'));
});

router.get("/api/bookpage/:book", async (req, res) => {
  let chapters = 0;
  let book = req.params.book;
  chapters = bookInfo.BOOKS[book].CHAPTER_COUNT;
  let promises = [];
  for (let i = 1; i < chapters; i++) {
    promises.push(fetch(
      `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/chapters/${book}.${i}?include-verse-numbers=false`,
      {
        headers: { 'api-key': process.env.API_KEY },
      }
    ).then(d => d.json())
      .catch((err) => {
        console.log(err);
      }));
  }
  const result = await Promise.all(promises)
  res.json(result);
});

module.exports = router;

