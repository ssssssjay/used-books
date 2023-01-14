const users = [];

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
module.exports = {
  formatMessage,
  userJoin,
  getCurrentUser,
  getRoomUsers,
};
