module.exports = {
  user: `select * from user`,
  userInsert: `insert into user set ? on duplicate key update ?`,
  userDetail: `select * from user where user_id=?`,
  userUpdate: `update user set ? where user_id=?`,
  userDelete: `delete from user where user_id=?`,
  getUser: `select * from user where user_email=?`,
  getUsedBook: `select * from product where product_id=?`,
  insertUsedBook: `insert into product set ?`,
  insertUsedBookLibrary: `insert into like_used_book set ?`,
  deleteUsedBookLibrary: `delete from like_used_book where book_id=? and user_id=? and product_id=?`,
  getUsedBookLibrary: `select product_id from like_used_book where user_id=?`,
  getUserNickname: `select user_nickname from user where user_id=?`,
};
