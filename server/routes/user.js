const express = require("express");
const router = express.Router();
const axios = require("axios");
const mysql = require("../mysql");

router.get("/data", async (req, res) => {
  const userData = await mysql.query("user");
  res.send(userData);
});

// 맨처음 로그인 뒤에 받는 요청부분
router.get("/", async (req, res) => {
  const userEmail = req.query.email;
  // 유저이메일을 토대로 유저정보를 가져오고
  // 9 ~ 15라인을 내부쿼리로 합치기
  const user = await mysql.query("getUser", [userEmail]);
  // 그 유저 아이디를 토대로 좋아요누른 중고책을 가져오고 like_used_book table
  const likeUsedBookIdList = await mysql.query(
    "getUsedBookLibrary",
    user[0].user_id
  );

  const likeUsedBookList = [];

  // 중고책데이터에 책 isbn아이디 값을 토대로 알라딘에 요청+product table에서 값 가져오고
  for (const obj of likeUsedBookIdList) {
    const result_used = await mysql.query("getUsedBook", obj.product_id);
    const usedBookData = result_used[0];
    // prettier-ignore
    const { link, isbn, itemId, priceSales, mallType, stockStatus, mileage, salesPoint, adult, fixedPrice, customerReviewRank, subInfo, ...bookData }
      = await axios
      .get("http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx", {
        params: {
          ttbkey: "ttbksj26190321932001",
          ItemId: usedBookData.book_id,
          ItemIdType: "ISBN13",
          output: "js",
          Version: 20131101,
          Cover: "Big",
        },
      })
      .then((res) => res.data.item[0]);
    Object.assign(usedBookData, bookData);
    likeUsedBookList.push(usedBookData);
  }

  const likeBookIdList = await mysql.query("getBookLibrary", user[0].user_id);
  const likeBookList = [];
  for (const obj of likeBookIdList) {
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
    likeBookList.push(bookData);
  }
  res.send({ user: user[0], likeUsedBookList, likeBookList });
});

// 맨처음 로그인
router.post("/login", async (req, res) => {
  const result = await mysql.query("userInsert", req.body.param);
  res.send(result);
});

router.delete("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const result = await mysql.query("userDelete", user_id);
  res.send(result);
});

module.exports = router;
