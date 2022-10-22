<template>
  <div class="card card-normal">
    <div class="card-body">
      <div class="book-img-wrapper mb-2">
        <img class="book-img" :src="props.imgPath" alt="책커버이미지" />
      </div>
      <div class="book-desc-wrapper">
        <div class="text-muted mb-3">{{ props.category }}</div>
        <!-- <div class="text-muted mb-3">{{ convertedCategory }}</div> -->
        <h3 class="card-title mb-3">{{ props.title }}</h3>
        <span class="card-subtitle text-muted">{{ props.author }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  category: String,
  imgPath: String,
  title: String,
  author: String,
});

const convertedCategory = computed(() => props.category.split(">")[1]);
</script>

<style scoped>
img {
  width: 100%;
}
.card {
  cursor: pointer;
  transition: all ease-in-out 0.1s;
}
.card:hover {
  transform: translateY(-6px);
}
.card-normal {
  width: 180px;
  height: 340px;
}
.card-normal .book-img-wrapper {
  width: 150px;
  height: 200px;
  /* width: 90%; */
  overflow: hidden;
}
.card-normal .card-title {
  font-weight: 700;
}
.card-normal .text-muted {
  font-size: 14px;
}
</style>
