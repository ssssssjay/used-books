const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/best", async (req, res) => {
  try {
    const categoryId = req.query.categoryId;
    const result = await axios
      .get("http://www.aladin.co.kr/ttb/api/ItemList.aspx", {
        params: {
          ttbkey: "ttbksj26190321932001",
          QueryType: "Bestseller",
          MaxResults: 10,
          start: 1,
          SearchTarget: "Book",
          output: "js",
          Version: 20131101,
          Cover: "Big",
          // 주석처리하고 요청보내면 0으로 갑니다
          CategoryId: categoryId,
        },
      })
      .then((res) => res.data);

    // if (result.errorCode) {
    // throw new Error(result.errorMessage);
    // }
    // { errorCode: 4, errorMessage: 'API출력이 금지된 회원입니다.' }
    console.log("success");
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.get("/search", async (req, res) => {
  try {
    // http://localhost:3000/book/search?q=자바스크립트?s=SalesPoint

    const searchQuery = req.query.q;
    const sortType = req.query.s;
    const countOfResults = req.query.cnt ? req.query.cnt : 5;
    const result = await axios
      .get("http://www.aladin.co.kr/ttb/api/ItemSearch.aspx", {
        params: {
          ttbkey: "ttbksj26190321932001",
          Query: searchQuery,
          QueryType: "Keyword",
          MaxResults: countOfResults,
          start: 1,
          Sort: sortType,
          SearchTarget: "Book",
          output: "js",
          Version: 20131101,
          Cover: "Big",
        },
      })
      .then((res) => res.data);

    console.log("success");
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.get("/detail", async (req, res) => {
  try {
    // http://localhost:3000/book/detail?q=자바스크립트

    const itemId = req.query.id;
    console.log(itemId);
    const result = await axios
      .get("http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx", {
        params: {
          ttbkey: "ttbksj26190321932001",
          ItemId: itemId,
          ItemIdType: "ISBN13",
          output: "js",
          Version: 20131101,
          Cover: "Big",
        },
      })
      .then((res) => res.data);

    console.log("success");
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = router;
// result의 일부
// status: 200,
// statusText: 'OK',
// headers: AxiosHeaders {
//   'cache-control': 'private',
//   'content-type': 'application/json; charset=utf-8',
//   server: 'Microsoft-IIS/8.5',
//   'x-aspnet-version': '2.0.50727',
//   'set-cookie': 'AladdinUS=ZKrK%2boUzjBg%3d&USA=0; domain=aladin.co.kr; expires=Sun, 19-Oct-2042 03:56:55 GMT; path=/',
//   'x-powered-by': 'ASP.NET',
//   p3p: "CP='CAO PSA CONi OTR OUR DEM ONL'",
//   date: 'Wed, 19 Oct 2022 03:56:54 GMT',
//   connection: 'close',
//   'content-length': '12122',
//   [Symbol(defaults)]: null
// },

// http://localhost:3000/book/best/jay?test=test
// console.log(req.path); // /best/jay
// console.log(req.query); // { test: 'test' }
// console.log(req.params); // { user: 'jay' }
