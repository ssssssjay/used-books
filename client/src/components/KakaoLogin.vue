<template>
  <div>
    <div
      class="fs-6 fw-bold"
      v-show="kakaoData.length == 0"
      @click="kakaoLogin()">
      login
    </div>
    <div
      class="fs-6 fw-bold"
      v-show="kakaoData.length != 0"
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
      kakaoData: [],
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
          const nickname = kakao_account.profile.nickname;
          const email = kakao_account.email;
          const image = kakao_account.profile.profile_image_url;
          console.log("account", kakao_account);
          console.log("email", email);
          console.log("nickname", nickname);
          console.log("image", image);
          this.kakaoData = kakao_account;
          alert(`${nickname}님 환영합니다`);
        },
        fail: (error) => {
          console.log(error);
        },
      });
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
        alert("로그아웃 되었습니다.", window.Kakao.Auth.getAccessToken());
      });
      this.kakaoData = [];
    },
  },
};
</script>
