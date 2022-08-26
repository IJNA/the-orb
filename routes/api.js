const router = require("express").Router();
require("dotenv").config();
const { log } = require("console");
const { response } = require("express");
const fetch = require("node-fetch");
const path = require('path');
// import '../utils/sections'
// import { BOOKS } from '../utils/bookInfo';
const bookInfo = require('../utils/bookInfo')

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/homepage.html'));
});

router.get("/api/bookpage/:book", async (req, res) => {
  let chapters = 0;
  // let book = req.params.book;
  let book = req.params.book;
  // console.log('req.params.book: ', book, typeof (book));
  // console.log('Book: ', bookInfo.BOOKS[book].CHAPTER_COUNT);
  // console.log('req.params: ', req.params);
  chapters = bookInfo.BOOKS[book].CHAPTER_COUNT;
  // console.log(data);
  // console.log(chapters);
  let promises = [];
  // console.log(chapters);
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
  // console.log('RESULT: ', result);
  res.json(result);
});

module.exports = router;

