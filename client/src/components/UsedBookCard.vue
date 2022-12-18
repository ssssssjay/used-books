<template>
  <div class="card card-used">
    <div class="card-body d-flex">
      <div class="book-img-wrapper me-4">
        <img
          class="book-img"
          src="@/assets/book-image-sample.webp"
          alt="베스트셀러" />
      </div>
      <div class="used-book-wrapper d-flex flex-column">
        <div class="text-muted mb-4">컴퓨터/IT</div>
        <div class="d-flex">
          <span class="card-title">모던 자바스크립트 딥다이브</span>
          <span class="emphasize ms-auto">8,000원</span>
        </div>
        <div class="mt-auto">
          <span class="emphasize">jayss</span>님이
          <span class="emphasize">경기도 용인시 수지구 죽전동</span>에서
          판매중이에요
        </div>
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
}
.card-used .book-img-wrapper {
  width: 100px;
}
.card-used .used-book-wrapper {
  width: 100%;
}
.card-used .card-title {
  font-size: 22px;
  font-weight: 600;
}
.card-used .emphasize {
  font-size: 18px;
  font-weight: 600;
}
</style>
