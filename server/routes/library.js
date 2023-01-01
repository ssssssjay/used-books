const express = require("express");
const router = express.Router();
const axios = require("axios");
const mysql = require("../mysql");

router.post("/create", async (req, res) => {
  try {
    const result = await mysql.query("insertUsedBookLibrary", req.body.param);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.delete("/delete", async (req, res) => {
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

module.exports = router;
