const express = require("express");
const router = express.Router();
const axios = require("axios");
const mysql = require("../mysql");

router.get("/", async (req, res) => {
  const userEmail = req.query.email;
  const user = await mysql.query("getUser", userEmail);
  res.send(user);
});

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
