<template>
  <div class="container">
    <section class="sect-search">
      <p class="h1 mt-3 mb-4">
        책을 검색할 수 있고,<br />중고 판매와 구매가 가능해요
      </p>
      <div class="main-search-wrapper">
        <input
          class="main-search-inp"
          type="text"
          placeholder="검색어를 입력하세요" />
        <button class="main-search-btn"><i class="bi bi-search h5"></i></button>
      </div>
    </section>
    <section class="sect-best-seller">
      <p class="h2">
        <span class="text-success">컴퓨터/IT </span>분야에서 인기있는 책들이에요
      </p>
      <ul class="d-flex flex-wrap">
        <li v-for="i in 10" :key="i">
          <button class="btn-category">컴퓨터/IT</button>
        </li>
      </ul>
      <ol class="d-flex flex-wrap">
        <li v-for="i in 10" :key="i">
          <BookCard></BookCard>
        </li>
      </ol>
    </section>
    <section class="sect-around">
      <p class="h2 text-center">내 주변에는 이런 책들이 있어요</p>
      <div class="canvas mb-4">canvas-section</div>
      <ul>
        <li v-for="i in 5" :key="i">
          <UsedBookCard></UsedBookCard>
        </li>
      </ul>
    </section>
    <div class="card card-first">
      <div class="card-body d-flex">
        <div class="book-img-wrapper mb-2 me-3">
          <img
            class="book-img"
            src="@/assets/book-image-sample.webp"
            alt="베스트셀러" />
        </div>
        <div class="book-desc-wrapper">
          <div class="text-muted mb-3">컴퓨터/IT</div>
          <h3 class="card-title mb-3">모던 자바스크립트 딥다이브</h3>
          <div class="card-desc">
            자바스크립트를 둘러싼 기본 개념을 정확하고 구체적으로 설명하고,
            자바스크립트 코드의 동작 원리를 집요하게 파헤친다. 작성한 코드가
            컴퓨터 내부에서 어떻게 동작할 것인지 예측하고, 명확히 설명할 수
            있도록 돕는다.
          </div>
          <span class="card-subtitle text-muted">이웅모</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookCard from "../components/BookCard.vue";
import UsedBookCard from "../components/UsedBookCard.vue";
</script>

<style scoped>
/* 공통 스타일 */
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
/* 메인 검색 영역 */
.sect-search {
  padding-block: 36px;
  margin-bottom: 24px;
}
.main-search-wrapper {
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
}

.main-search-inp {
  width: 100%;
  padding: 14px 24px;
  border-radius: 28px;
  line-height: 22px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.main-search-btn {
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translateY(-45%);
}
/* 베스트셀러 영역 */
.sect-best-seller {
  padding-block: 36px;
  margin-bottom: 24px;
}
.btn-category {
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d172a;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.47);
}

.btn-category:hover {
  background-color: #457e2b;
  color: #fff;
}
.card-first {
  width: 384px;
  height: 340px;
}
.card-first .book-img-wrapper {
  width: 180px;
  perspective: 1000px;
  /* perspective-origin: 20% 10%; */
}
.book-img {
  transform: rotateY(30deg);
  border: 1px solid black;
}
.card-first .book-desc-wrapper {
  width: 170px;
}
.card-first .text-muted {
  font-size: 14px;
}

.card-first .card-title {
  font-weight: 700;
}
.card-first .card-desc {
  line-height: 1.2rem;
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

/* 내 주변 중고도서 영역 */
.sect-around {
  width: 720px;
  margin: 0 auto;
  padding-block: 36px;
}
.canvas {
  height: 360px;
  border: 1px solid black;
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

.d-flex {
  gap: 10px;
}
</style>
