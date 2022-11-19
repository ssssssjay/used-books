module.exports = {
  user: `select * from user`,
  userInsert: `insert into user set ? on duplicate key update ?`,
  userDetail: `select * from user where user_id=?`,
  userUpdate: `update user set ? where user_id=?`,
  userDelete: `delete from user where user_id=?`,
};
