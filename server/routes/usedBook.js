const express = require("express");
const router = express.Router();
const axios = require("axios");
const mysql = require("../mysql");

router.get("/", async (req, res) => {
  try {
    const productId = req.query.id;
    const result = await mysql.query("getUsedBook", [productId]);
    const [{ user_nickname }] = await mysql.query("getUserNickname", [
      result[0].seller_user_id,
    ]);
    res.send({ ...result, user_nickname });
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
