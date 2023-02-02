const users = [];
const express = require("express");
const router = express.Router();
const axios = require("axios");
const mysql = require("../mysql");

// Join user to chat
function userJoin(id, user_id, user_nickname, room) {
  const user = { id, user_id, user_nickname, room };
  users.push(user);
  return user;
}

// get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

const moment = require("moment");

function formatMessage(user_id, user_nickname, msg) {
  return {
    user_id,
    user_nickname,
    msg,
    time: moment().format("h:mm a"),
  };
}
router.get("/", async (req, res) => {
  try {
    const user_list = req.query.user_list;
    const rev_user_list = req.query.rev_user_list;

    const result = await mysql.query("getChatId", [user_list, rev_user_list]);
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});
router.get("/user", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const result = await mysql.query("getUserData", user_id);

    res.send(result);
  } catch (e) {
    console.log(e);
  }
});
router.get("/list", async (req, res) => {
  try {
    const user_id = req.query.user_id;

    const result = await mysql.query("getChatRoomList", Number(user_id));
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});
router.get("/content", async (req, res) => {
  try {
    const chat_id = req.query.chat_id;

    const result = await mysql.query("getChatContent", chat_id);
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});
router.post("/sendMsg", async (req, res) => {
  const result = await mysql.query("sendMsg", req.body.param);
  res.send(result);
});
router.post("/create", async (req, res) => {
  const result = await mysql.query("chatInsert", req.body.param);
  res.send(result);
});

module.exports = router;
