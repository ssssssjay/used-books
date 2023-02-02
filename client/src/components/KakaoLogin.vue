<template>
  <div>
    <div
      class="fs-6 fw-bold"
      v-show="this.userInfo.user_id == undefined"
      @click="kakaoLogin()">
      login
    </div>
    <div
      class="fs-6 fw-bold"
      v-show="this.userInfo.user_id != undefined"
      @click="kakaoLogout()">
      logout
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email, profile_image",
        success: this.getInfo,
      });
    },
    getInfo() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          this.dbRes(kakao_account);
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
    // uniq 설정
    async dbRes(data) {
      await this.$post("http://localhost:3000/user/login", {
        param: [
          {
            user_nickname: data.profile.nickname,
            user_email: data.email,
            user_image: data.profile.profile_image_url,
          },
          {
            user_nickname: data.profile.nickname,
            user_image: data.profile.profile_image_url,
          },
        ],
      });
      const result = await this.$get(
        `http://localhost:3000/user?email=${data.email}`
      );
      this.$store.commit("setUser", result.user);
      this.$store.commit("isLoginCk", true);
      this.$store.commit(
        "setLikeUsedBookList",
        result.likeUsedBookList.map((obj) => obj.product_id)
      );
    },
    kakaoLogout() {
      // window.Kakao.API.request({
      //   url: "/v1/user/unlink",
      //   success: function (response) {
      //     console.log(response);
      //   },
      //   fail: function (error) {
      //     console.log(error);
      //   },
      // });

      if (!window.Kakao.Auth.getAccessToken()) {
        console.log("로그인 상태가 아닙니다");
        return;
      }
      window.Kakao.Auth.logout(function () {
        window.Kakao.Auth.getAccessToken();
      });
      this.$store.commit("setUser", {});
      this.$store.commit("logout", false);
    },
  },
};
</script>
