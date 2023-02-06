const express = require("express");
const router = express.Router();
const axios = require("axios");
const mysql = require("../mysql");

router.get("/", async (req, res) => {
  try {
    // http://localhost:5173/used-book?id=11
    const productId = req.query.id;
    const result = await mysql.query("getUsedBook", [productId]);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    // http://localhost:5173/used-book/all
    const result = await mysql.query("getAllUsedBook");
    const usedBookList = [];

    for (const obj of result) {
      // prettier-ignore
      const { link, isbn, itemId, priceSales, mallType, stockStatus, mileage, salesPoint, adult, fixedPrice, customerReviewRank, subInfo, ...bookData }
    = await axios
    .get("http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx", {
      params: {
        ttbkey: "ttbksj26190321932001",
        ItemId: obj.book_id,
        ItemIdType: "ISBN13",
        output: "js",
        Version: 20131101,
        Cover: "Big",
      },
    })
          .then((res) => res.data.item[0]);
      Object.assign(obj, bookData);
      usedBookList.push(obj);
    }
    res.send(usedBookList);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.get("/bookDetail", async (req, res) => {
  try {
    console.log("test");
    const book_Id = req.query.book_Id;
    const result = await mysql.query("getUsedBook2", book_Id);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.post("/create", async (req, res) => {
  try {
    const result = await mysql.query("insertUsedBook", [req.body.param]);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
