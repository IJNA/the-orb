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
  // TODO:put in function in bookInfo module js
  switch (book) {
    case '1SA':
      chapters = bookInfo.BOOKS.FSA.CHAPTER_COUNT;
      break;
    case '2SA':
      chapters = bookInfo.BOOKS.SSA.CHAPTER_COUNT;
      break;
    case '1KI':
      chapters = bookInfo.BOOKS.FKI.CHAPTER_COUNT;
      break;
    case '2KI':
      chapters = bookInfo.BOOKS.SKI.CHAPTER_COUNT;
      break;
    case '1CH':
      chapters = bookInfo.BOOKS.FCH.CHAPTER_COUNT;
      break;
    case '2CH':
      chapters = bookInfo.BOOKS.SCH.CHAPTER_COUNT;
      break;
    case '1CO':
      chapters = bookInfo.BOOKS.FCO.CHAPTER_COUNT;
      break;
    case '2CO':
      chapters = bookInfo.BOOKS.SCO.CHAPTER_COUNT;
      break;
    case '1TH':
      chapters = bookInfo.BOOKS.FTH.CHAPTER_COUNT;
      break;
    case '2TH':
      chapters = bookInfo.BOOKS.STH.CHAPTER_COUNT;
      break;
    case '1TI':
      chapters = bookInfo.BOOKS.FTI.CHAPTER_COUNT;
      break;
    case '2TI':
      chapters = bookInfo.BOOKS.STI.CHAPTER_COUNT;
      break;
    case '1PE':
      chapters = bookInfo.BOOKS.FPE.CHAPTER_COUNT;
      break;
    case '2PE':
      chapters = bookInfo.BOOKS.SPE.CHAPTER_COUNT;
      break;
    case '1JN':
      chapters = bookInfo.BOOKS.FJN.CHAPTER_COUNT;
      break;
    case '2JN':
      chapters = bookInfo.BOOKS.SJN.CHAPTER_COUNT;
      break;
    case '3JN':
      chapters = bookInfo.BOOKS.TJN.CHAPTER_COUNT;
      break;
    default:
      chapters = bookInfo.BOOKS[book].CHAPTER_COUNT;
      break;
  }
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

