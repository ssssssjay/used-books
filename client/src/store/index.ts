import { createStore } from "vuex";
import persistedstate from "vuex-persistedstate";
import VueCookies from "vue-cookies";

export default createStore({
  state: {
    userInfo: {},
    likeUsedBookList: [],
    isLogin: false,
    likeBookList: [],
  },
  modules: {},
  plugins: [
    persistedstate({
      paths: ["userInfo", "likeUsedBookList", "likeBookList", "isLogin"],
    }),
  ],
  getters: {
    isLogin(state) {
      if (state.userInfo != undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
  mutations: {
    // vue-cookies 를 설치하면 쿠키에 정보가 저장되는데 일정시간(시간설정가능)이 지나면 자동으로 삭제됨
    // 해당 기능으로 임시적으로 로그인, 로그아웃을 구현할수있음.
    // vuex-persistedstate 위와 동일한 기능이나 로컬스토리지에 저장되며 시간설정이 불가능

    setUser(state, userInfo) {
      state.userInfo = userInfo;
      VueCookies.set("userInfo", userInfo, "8h");
    },
    isLoginCk(state, data) {
      state.isLogin = data;
      VueCookies.set("isLogin", data, "8h");
    },
    logout(state, data) {
      state.userInfo = {};
      state.isLogin = data;
      VueCookies.remove("userInfo");
    },
    setLikeUsedBookList(state, likeUsedBookList) {
      state.likeUsedBookList = likeUsedBookList;
    },
    addLikeUsedBookList(state, usedBookId) {
      state.likeUsedBookList.push(usedBookId);
    },
    deleteLikeUsedBookList(state, usedBookId) {
      const idx = state.likeUsedBookList.findIndex(
        (book) => book.product_id === usedBookId
      );
      state.likeUsedBookList.splice(idx, 1);
    },

    setLikeBookList(state, likeBookList) {
      state.likeBookList = likeBookList;
    },
    addLikeBookList(state, bookId) {
      state.likeBookList.push(bookId);
    },
    deleteLikeBookList(state, bookId) {
      const idx = state.likeBookList.findIndex(
        (book) => book.isbn13 === bookId
      );
      state.likeBookList.splice(idx, 1);
    },
  },
});
