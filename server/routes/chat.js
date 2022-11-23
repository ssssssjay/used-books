const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
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
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}
module.exports = {
  formatMessage,
  userJoin,
  getCurrentUser,
  getRoomUsers,
};
