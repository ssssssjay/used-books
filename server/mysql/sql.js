module.exports = {
  user: `select * from user`,
  userInsert: `insert into user set ? on duplicate key update ?`,
  userDetail: `select * from user where user_id=?`,
  userUpdate: `update user set ? where user_id=?`,
  userDelete: `delete from user where user_id=?`,
  getUser: `select * from user where user_email=?`,
  getUsedBook: `select * from product where product_id=?`,
  getUsedBook2: `select * from product where book_id=?`,
  insertUsedBook: `insert into product set ?`,
  insertUsedBookLibrary: `insert into like_used_book set ?`,
  deleteUsedBookLibrary: `delete from like_used_book where book_id=? and user_id=? and product_id=?`,
  getUsedBookLibrary: `select product_id from like_used_book where user_id=?`,
  getUserNickname: `select user_nickname from user where user_id=?`,
  chatInsert: `insert into chat set ? on duplicate key update ? `,
  sendMsg: `insert into chat_content set ?  `,
  getChatId: `SELECT chat.chat_id FROM used_books.chat where user_list=? or user_list=?; `,
  getChatRoomList: `SELECT * FROM used_books.chat where user_list like '%?%'`,
  // `select c.*,u.user_nickname as buyer_name,
  // u.user_image as buyer_img ,u2.user_nickname as seller_name,
  // u2.user_image as seller_img from chat c , user u, user u2
  // where c.buyer_id =u.user_id and c.seller_id = u2.user_id and (u.user_id = ? or u2.user_id = ?)`,
  getUserData: `SELECT * FROM used_books.user where user_id = ?`,
  getChatContent: `select c.*,ct.msg,ct.sender_id,ct.time,u.user_nickname,u.user_image
  from chat c , chat_content ct, user u
  where c.chat_id = ct.chat_id and ct.sender_id = u.user_id and c.chat_id = ? order by ct.created_at `,
  getUsedByBookId: `select * from product where book_id=?`,
  getAllUsedBook: `SELECT product_id, book_id, seller_user_id, seller_user_nickname, price, location, coordination
  FROM used_books.product
  WHERE sold_out=0`,
  insertBookLibrary: `insert into like_book set ?`,
  deleteBookLibrary: `delete from like_book where book_id=? and user_id=?`,
  getBookLibrary: `select book_id from like_book where user_id=?`,
};
