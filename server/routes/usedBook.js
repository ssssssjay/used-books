const express = require("express");
const router = express.Router();
const axios = require("axios");
const mysql = require("../mysql");

router.get("/", async (req, res) => {
  try {
    const productId = req.query.id; // ?=2
    const result = await mysql.query("getUsedBook", [productId]);
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
