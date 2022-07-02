const router = require("express").Router();
require("dotenv").config();
const { log } = require("console");
const { response } = require("express");
const fetch = require("node-fetch");
const path = require('path');

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/homepage.html'));
});

router.get("/api/bookpage/", async (req, res) => {
  let chapters = 0;
  fetch(
    `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/books/PSA/chapters`,
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
          `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/chapters/PSA.${i}?include-verse-numbers=false`,
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

  ////////////// //////// ///////////////////////////////  
  ////////////// 3rd attempt WORKS///////
  ////////////// //////// ///////////////////////////////  
  // let promises = [];
  // console.log(chapters);
  // for (let i = 1; i < chapters; i++) {
  //   console.log({i, chapters});
  //   promises.push(fetch(
  //     `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/chapters/GEN.1?include-verse-numbers=false`,
  //     {
  //       // method: 'GET',
  //       headers: { 'api-key': process.env.API_KEY },
  //     }
  //   ).then(d => d.json()))
  // }


  // const result = await Promise.all(promises)
  // console.log(result);
  // res.json(result);
  ////////////// //////// ///////////////////////////////  
  ////////////// 2nd attempt WORKS///////
  ////////////// //////// ///////////////////////////////  
  // let promises = []
  // for (let i = 1; i < 51; i++) {
  //   console.log(i);
  //   promises.push(fetch(
  //     `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/chapters/GEN.${i}?include-verse-numbers=false`,
  //     {
  //       // method: 'GET',
  //       headers: { 'api-key': process.env.API_KEY },
  //     }
  //   ));
  // }
  // Promise.all(promises)
  //   .then((responses) => {
  //     return Promise.all(responses.map(r => {
  //       // console.log('RESPONSES: ', r.json());
  //       return r.json()
  //     }))
  //   })
  //   .then((data) => {
  //     console.log('DATA: ', data);
  //     console.log(data);
  //     res.json(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  ////////////// //////// ///////////////////////////////  
  ////////////// 1st attempt ///////
  ////////////// //////// ///////////////////////////////  
  // let promises = [];
  // for (let i = 1; i < 51; i++) {
  //   console.log(i);
  //   promises.push(fetch(
  //     `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/chapters/GEN.1?include-verse-numbers=false`,
  //     {
  //       // method: 'GET',
  //       headers: { 'api-key': process.env.API_KEY },
  //     }
  //   ));
  // }
  // Promise.all(promises)
  //   .then((responses) => {
  //     // console.log(responses);
  //     responses.map(r => {
  //       console.log(r.json()); 
  //       return r.json() 
  //     })
  //   })
  //   // .then(() => {
  //   //   return fetch('https://api.scripture.api.bible/v1/')
  //   //     .then(response => {
  //   //       console.log(response);
  //   //       if (response.ok) {
  //   //         console.log('RESPONSE: ', response.json());
  //   //         return response.json();
  //   //       }
  //   //     });
  //   //   // return response.json();
  //   // })
  //   .then((data) => {
  //     console.log(data);
  //     res.json(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  ////////////// //////// ///////////////////////////////  
  ////////////// Premis.all stackoverdlow example ///////
  ////////////// //////// ///////////////////////////////  

  // for (let i = 1; i <= 300; i++) {
  //   promises.push(fetch(`example.api/incomes/${i}`));
  // }
  // Promise.all(promises)
  //   .then(function handleData(data) {
  //     return fetch("example.api") // should be returned 1 time
  //       .then(response => {
  //         if (response.ok) return response.json();
  //         throw new Error(response.statusText);
  //       });
  //   })
  //   .catch(function handleError(error) {
  //     console.log("Error" + error);
  //   });

  ////////////// //////// ///////////////////////////////  
  ////////////// SLOW WAY ///////////////////////////////  
  ////////////// //////// ///////////////////////////////  
  // let content = '';
  // for (let i = 1; i < 51; i++) {
  //   const response = await fetch(`https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/chapters/GEN.1?include-verse-numbers=false`,
  //     {
  //       // method: 'GET',
  //       headers: { 'api-key': process.env.API_KEY },
  //     })
  //   const json = await response.json()
  //   content += json.data.content;
  //   // console.log(content);
  // }
  // res.json(content);
  ////////////// //////// ///////////////////////////////  
  ////////////// SLOW WAY ///////////////////////////////  
  ////////////// //////// ///////////////////////////////  
});

module.exports = router;

