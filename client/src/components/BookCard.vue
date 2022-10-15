<template>
  <div class="card card-normal">
    <div class="card-body">
      <div class="book-img-wrapper mb-2">
        <img
          class="book-img"
          src="@/assets/book-image-sample.webp"
          alt="베스트셀러" />
      </div>
      <div class="book-desc-wrapper">
        <div class="text-muted mb-3">컴퓨터/IT</div>
        <h3 class="card-title mb-3">모던 자바스크립트 딥다이브</h3>
        <span class="card-subtitle text-muted">이웅모</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
}
.card-normal .card-title {
  font-weight: 700;
}
.card-normal .text-muted {
  font-size: 14px;
}
</style>
