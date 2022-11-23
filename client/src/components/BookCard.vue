<template>
  <div class="card card-normal">
    <div class="book-img-wrapper">
      <img class="book-img" :src="props.imgPath" alt="책커버이미지" />
    </div>
    <div class="card-body">
      <div class="book-desc-wrapper">
        <div class="text-muted mb-3">{{ convertedCategory }}</div>
        <h3 class="card-title mb-3">{{ props.title }}</h3>
        <span class="card-subtitle text-muted">{{ props.author }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props: any = defineProps({
  category: String,
  imgPath: String,
  title: String,
  author: String,
});

const convertedCategory = computed(() =>
  props.category?.split(">")[1] === undefined
    ? props.category
    : props.category.split(">")[1]
);
</script>

<style scoped>
img {
  width: 100%;
}
.card {
  cursor: pointer;
  transition: all ease-in-out 0.1s;
  width: 200px;
}
.card-normal {
  overflow: hidden;
}
.card-normal .book-img-wrapper {
  height: 260px;
  overflow: hidden;
}
.card-normal .text-muted {
  font-size: 12px;
}
.card-body {
  padding: 10px;
}
</style>
