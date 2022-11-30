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
        <li class="me-4">
          <RouterLink
            to="/library"
            class="fs-6 fw-bold"
            :class="{ active: route.path === '/library' }"
            >library</RouterLink
          >
        </li>
        <li class="me-4">
          <RouterLink
            to="/chat"
            class="fs-6 fw-bold"
            :class="{ active: route.path === '/chat' }"
            >chatting</RouterLink
          >
        </li>
        <li class="me-4">
          <RouterLink
            to="/history"
            class="fs-6 fw-bold"
            :class="{ active: route.path === '/history' }"
            >history</RouterLink
          >
        </li>
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

import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isHomeRoute = computed(
  () => route.path === "/" || route.path === "/used-book/create"
);
</script>

<script>
export default {
  components: {},
  data() {
    return {};
  },

  created() {},
  mounted() {},
  unmounted() {},
  methods: {},
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>
<style scoped>
.active {
  color: #457e2b;
}
</style>
