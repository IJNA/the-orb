const router = require("express").Router();
require("dotenv").config();
const { log } = require("console");
const { response } = require("express"); //! DELETE?
const fetch = require("node-fetch");
const path = require('path');
const bookInfo = require('../utils/bookInfo')

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/homepage.html'));
});

router.get("/api/bookpage/:book", async (req, res) => {
  let book = req.params.book;
  currentBookInfo = bookInfo.setBookInfo(book);
  let chapters = currentBookInfo.chapters;
  let bookName = currentBookInfo.bookName;
  let nextBook = currentBookInfo.nextBook;
  let nextApiName = currentBookInfo.nextApiName;
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
  res.json({result, bookName, nextBook, nextApiName});
});
router.get("/api/searchpage/:search", (req, res) => { 
  let search = req.params.search;
  fetch(
    `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/search?query=${search}`,
    {
      headers: { 'api-key': process.env.API_KEY },
    }
  ).then(response => {
    return response.json();
  }).then(data => {
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
  });

});
module.exports = router;