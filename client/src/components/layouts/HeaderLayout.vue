<template>
  <header class="py-3 border-bottom shadow-sm sticky-top bg-white">
    <nav class="container">
      <ul class="d-flex flex-wrap align-items-center">
        <li class="me-auto">
          <RouterLink to="/" class="fs-5 fw-bold"
            ><span class="text-success">used:</span> Books</RouterLink
          >
        </li>
        <li class="me-4">
          <BookSearchInput v-if="!isHomeRoute"></BookSearchInput>
        </li>
        <div class="menu" v-show="this.$store.state.isLogin">
          <li class="me-4">
            <RouterLink
              to="/library"
              class="fs-6 fw-bold"
              :class="{ active: route.path === '/library' }"
              >library</RouterLink
            >
          </li>
          <li class="me-4">
            <div class="dropdown" v-show="noChat">
              <button
                class="fs-6 fw-bold"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                chatting
              </button>
              <ul class="dropdown-menu alert-msg mt-4" v-show="clickChat">
                <li>
                  <div class="">등록된 채팅이 없습니다</div>
                </li>
              </ul>
            </div>
            <RouterLink
              v-show="!noChat"
              to="/chat"
              class="fs-6 fw-bold"
              :class="{ active: route.path === '/chat' }"
              >chatting</RouterLink
            >
          </li>
          <!-- <li class="me-4">
            <RouterLink
              to="/history"
              class="fs-6 fw-bold"
              :class="{ active: route.path === '/history' }"
              >history</RouterLink
            >
          </li> -->
        </div>
        <li>
          <KakaoLogin></KakaoLogin>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import KakaoLogin from "@/components/KakaoLogin.vue";
import BookSearchInput from "@/components/BookSearchInput.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isHomeRoute = computed(
  () => route.path === "/" || route.path === "/used-book/create"
);
</script>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      noChat: true,
      chatAlert: false,
      clickChat: true,
    };
  },

  created() {},
  mounted() {
    this.getChat();
  },
  unmounted() {},
  methods: {
    async getChat() {
      const result = await axios.get(`http://localhost:3000/chat/list`, {
        params: {
          user_id: this.$store.state.userInfo.user_id,
        },
      });
      if (result.data.length == 0) {
        this.noChat = true;
      } else {
        this.noChat = false;
      }
    },
    changeDropdown() {
      this.clickChat = !this.clickChat;
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>
<style scoped>
nav.container ul {
  height: 40px;
}
.active {
  color: #457e2b;
}
.menu {
  display: flex;
}
.alert-msg {
  background: #167421;
  color: white;
  padding: 10px;
  width: 200px;
}
</style>
