<template>
  <div class="card card-normal" v-show="props.bookType == 'used'">
    <div class="book-img-wrapper">
      <img class="book-img" :src="props.imgPath" alt="책커버이미지" />
    </div>
    <div class="card-body">
      <div class="book-desc-wrapper">
        <div class="text-muted mb-3">상태 : {{ props.status }}</div>
        <h3 class="card-title ellipsis mb-3">위치 : {{ props.location }}</h3>
        <span class="card-subtitle ellipsis text-muted"
          >가격 : {{ props.price }}원</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props: any = defineProps({
  imgPath: String,
  status: String,
  location: String,
  price: Number,
  nickname: String,
  bookType: String,
});

console.log(props.status);
switch (props.status) {
  case "U":
    props.status == "상";
    break;
  case "M":
    props.status == "중";
    break;
  case "L":
    props.status == "하";
    break;
}
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
.ellipsis {
  height: 2em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-normal .text-muted {
  font-size: 12px;
}
.card-body {
  padding: 10px;
}
</style>
