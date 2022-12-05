const express = require("express");
const router = express.Router();
const axios = require("axios");
const mysql = require("../mysql");

// TODO: product_id에 의거한 불러오기
router.get("/", async (req, res) => {
  try {
  } catch (error) {}
});

router.post("/create", async (req, res) => {
  try {
    const result = await mysql.query("insertUsedBook", [req.body.param]);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
