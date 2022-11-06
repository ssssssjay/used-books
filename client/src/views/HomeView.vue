<template>
  <div class="container">
    <section class="sect-search col-10">
      <p class="search-tit h1">
        책을 검색할 수 있고,<br />중고 판매와 구매가 가능해요
      </p>
      <BookSearchInput></BookSearchInput>
    </section>
    <section class="sect-best-seller col-10">
      <p class="h2 mb-4">
        <span class="text-success">컴퓨터/IT </span>분야에서 인기있는 책들이에요
      </p>
      <ul class="d-flex flex-wrap mb-4">
        <li v-for="(code, name) in BOOK_CODE" :key="code">
          <button class="btn-category" @click="selectCategory(code)">
            {{ name }}
          </button>
        </li>
      </ul>
      <ol class="d-flex">
        <li v-for="item in bestSellerList" :key="item.isbn" class="">
          <BookCard
            :category="item.categoryName"
            :imgPath="item.cover"
            :title="item.title"
            :author="item.author"></BookCard>
        </li>
      </ol>
    </section>
    <section class="sect-around col-8">
      <p class="h2 text-center">내 주변에는 이런 책들이 있어요</p>
      <KakaoMapComponent></KakaoMapComponent>
      <ul>
        <li v-for="i in 5" :key="i">
          <UsedBookCard></UsedBookCard>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import BookCard from "@/components/BookCard.vue";
import UsedBookCard from "@/components/UsedBookCard.vue";
import BookSearchInput from "@/components/BookSearchInput.vue";
import KakaoMapComponent from "@/components/KakaoMapComponent.vue";
import { BOOK_CODE } from "@/stores/BookCode";

import axios from "axios";
import { ref } from "vue";

const bestSellerList = ref([] as any);

const getBestSeller = async (categoryId: number) => {
  const result = await axios
    .get("http://localhost:3000/book/best", {
      params: {
        categoryId: categoryId,
      },
    })
    .then((res) => res.data);
  // console.log(result);
  // console.log(result.item);
  bestSellerList.value = result.item;
};

getBestSeller(0);

const selectCategory = (categoryId: number) => {
  // console.log(categoryId);
  getBestSeller(categoryId);
};
</script>

<style scoped>
.d-flex {
  gap: 20px;
}
/* 메인 검색 영역 */
.sect-search {
  margin: 0 auto;
  padding-block: 15vh;
}
.sect-search .search-tit {
  margin-bottom: 6vh;
}
/* 베스트셀러 영역 */
.sect-best-seller {
  padding-block: 36px;
  margin: 0 auto 24px;
  border: 1px solid dodgerblue;
}
.btn-category {
  border: 1px solid #222222;
  border-radius: 8px;
  color: #222222;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
  padding: 13px 23px;
  outline: none;
  text-decoration: none;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s, background-color 0.1s, color 0.1s;
  width: auto;
}
.btn-category:focus-visible {
  box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
  transition: box-shadow 0.2s;
}

.btn-category:active {
  background-color: #f7f7f7;
  border-color: #000000;
  transform: scale(0.96);
}
.btn-category:hover {
  border: 1px solid #457e2b;
  background-color: #457e2b;
  color: #fff;
}
/* 내 주변 중고도서 영역 */
.sect-around {
  margin: 0 auto;
  padding-block: 36px;
}
.canvas {
  height: 360px;
  border: 1px solid black;
}
</style>
