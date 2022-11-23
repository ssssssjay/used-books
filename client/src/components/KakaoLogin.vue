<template>
  <div>
    <div
      class="fs-6 fw-bold"
      v-show="this.login == false"
      @click="kakaoLogin()">
      login
    </div>
    <div
      class="fs-6 fw-bold"
      v-show="this.login == true"
      @click="kakaoLogout()">
      logout
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      login: false,
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
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
      this.$store.commit("setUser", data);
      this.login = true;
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
      this.login = false;
      this.$store.commit("setUser", {});
    },
  },
};
</script>
