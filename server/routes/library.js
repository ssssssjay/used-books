const express = require("express");
const router = express.Router();
const axios = require("axios");
const mysql = require("../mysql");

// 중고도서 등록
router.post("/createUsed", async (req, res) => {
  try {
    const result = await mysql.query("insertUsedBookLibrary", req.body.param);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// 중고도서 삭제
router.delete("/deleteUsed", async (req, res) => {
  try {
    const { book_id, user_id, product_id } = req.query;
    const result = await mysql.query("deleteUsedBookLibrary", [
      book_id,
      user_id,
      product_id,
    ]);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// 도서 등록
router.post("/createBook", async (req, res) => {
  try {
    const result = await mysql.query("insertBookLibrary", req.body.param);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// 도서 삭제
router.delete("/deleteBook", async (req, res) => {
  try {
    const { book_id, user_id } = req.query;
    const result = await mysql.query("deleteBookLibrary", [book_id, user_id]);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = router;
