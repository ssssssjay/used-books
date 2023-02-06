<template>
  <div>
    <button
      ref="btnCreate"
      class="btn btn-success"
      @click="goUsedBookCreatePage">
      중고등록
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const goUsedBookCreatePage = () => {
  router.push("/used-book/create");
};

const btnCreate = ref(null);
watch(route, (newRoute) => {
  if (newRoute.path === "/used-book/create" || newRoute.path === "/chat") {
    btnCreate.value.style = "display: none;";
  } else {
    btnCreate.value.style = "display: block;";
  }
});
</script>

<style scoped></style>
