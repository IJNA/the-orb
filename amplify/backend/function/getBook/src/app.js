/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const fetch = require("node-fetch");
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bookInfo = require("./bookInfo");

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/bookPage/:book', function(req, res) {
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
}});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
