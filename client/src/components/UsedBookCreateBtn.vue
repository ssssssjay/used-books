<template>
  <div>
    <button class="btn btn-success" @click="goUsedBookCreatePage">
      중고등록
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goUsedBookCreatePage = () => {
  router.push("/used-book/create");
};
</script>

<style scoped></style>
