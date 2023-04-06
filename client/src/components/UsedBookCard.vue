<template>
  <div class="card card-used">
    <div class="card-body d-flex">
      <div class="book-img-wrapper me-4">
        <img class="book-img" :src="props.cover" alt="베스트셀러" />
      </div>
      <div class="used-book-wrapper d-flex flex-column">
        <div class="text-muted mb-4">{{ convertedCategory }}</div>
        <div class="d-flex">
          <span class="card-title">{{ convertedTitle }}</span>
          <span class="emphasize ms-auto">{{ props.price }}원</span>
        </div>
        <div class="mt-auto">
          <span class="emphasize">{{ props.seller_user_nickname }}</span
          >님이 <span class="emphasize">{{ props.location }}</span
          >에서 판매중이에요
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  title: string;
  categoryName: string;
  location: string;
  cover: string;
  product_id: number;
  seller_user_nickname: string;
  price: number;
}>();

// console.log(props);
const validateString = (
  targetString: string,
  targetIndex: number,
  seperator: string
) => {
  if (targetString === undefined) {
    return "no-data";
  }
  if (targetString.split(seperator)[targetIndex] === undefined) {
    return targetString;
  }
  return targetString.split(seperator)[targetIndex];
};
const convertedCategory = computed(() =>
  validateString(props.categoryName, 1, ">")
);
const convertedTitle = computed(() => validateString(props.title, 0, "-"));
</script>

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
  font-size: 18px;
  font-weight: 600;
}
.card-used .emphasize {
  font-size: 18px;
  font-weight: 600;
}
</style>
