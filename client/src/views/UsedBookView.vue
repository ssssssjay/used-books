<template>
  <div class="container">
    <section class="mt-4 d-flex sect-brief col-10 m-auto">
      <div class="col-3">
        <img src="@/assets/book-image-sample.webp" alt="책이미지예시" />
      </div>
      <div class="col-9">
        <div class="text-muted mb-2">컴퓨터/IT</div>
        <h3 class="h3">모던 자바스크립트 딥다이브</h3>
        <div class="mb-2">이웅모</div>
        <div class="mb-4">위키북스</div>
        <p class="fs-5 mb-4">
          <span class="text-success">jayss</span>님이
          <span class="text-success">용인시 수지구 죽전동</span>에서
          판매중이에요
        </p>
        <dl class="d-flex flex-wrap">
          <dt class="col-6 fw-bold">정가</dt>
          <dd class="">20,000원</dd>
          <dt class="col-6 fw-bold">중고판매가</dt>
          <dd class="">7,000원</dd>
        </dl>
        <!-- bordered inactive... -->
        <table class="table table-striped table-bordered text-center">
          <thead>
            <tr class="">
              <th scope="col" class="col-2"></th>
              <th scope="col" class="col">나쁨</th>
              <th scope="col" class="col">보통</th>
              <th scope="col" class="col">좋음</th>
            </tr>
          </thead>
          <tbody class="">
            <tr class="">
              <th scope="row">책 상태</th>
              <td>O</td>
              <td></td>
              <td></td>
            </tr>
            <tr class="">
              <th scope="row">찢어짐</th>
              <td></td>
              <td>O</td>
              <td></td>
            </tr>
            <tr class="">
              <th scope="row">오염 여부</th>
              <td></td>
              <td></td>
              <td>O</td>
            </tr>
            <tr class="">
              <th scope="row">낙서 여부</th>
              <td></td>
              <td>O</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="float-end">
          <button class="btn btn-outline-success me-1" @click="addLibrary">
            <i v-show="!isLibraryCart" class="bi bi-bag-check"></i>
            <i v-show="isLibraryCart" class="bi bi-bag-check-fill"></i>
          </button>
          <button class="btn btn-success me-1">구매하기</button>
          <button class="btn btn-success">채팅하기</button>
        </div>
      </div>
    </section>
    <main class="sect-detail col-10 m-auto">
      <h1 class="h4">물품 소개글</h1>
      <hr class="mb-2 mt-0" />
      <div>
        <div class="col-3 me-2 d-inline-block">
          <img src="@/assets/book-image-sample.webp" alt="책이미지예시" />
        </div>
        <div class="col-3 me-2 d-inline-block">
          <img src="@/assets/book-image-sample.webp" alt="책이미지예시" />
        </div>
        <div class="col-3 d-inline-block">
          <img src="@/assets/book-image-sample.webp" alt="책이미지예시" />
        </div>
      </div>
      <span class="lh-base"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        aliquid earum eum pariatur a ad doloremque nam similique numquam,
        consequuntur aperiam maxime? Autem accusamus eligendi mollitia incidunt
        neque dolore asperiores!</span
      >
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const isLibraryCart = ref(false);
const addLibrary = () => {
  isLibraryCart.value = !isLibraryCart.value;
  // TODO: api로 등록 삭제 if문으로 --면 등록 --면 삭제 셋타임아웃으로 지연시키기
};

const getUsedBookData = async () => {
  // TODO: id에 의거한 요청, 에러핸들링, 에외처리
  const result = await axios.get("http://localhost:3000/used-book?id=5");
  console.log(result.status);
  console.log(result.data);
};
getUsedBookData();
</script>

<style scoped>
img {
  width: 100%;
}
.sect-brief {
  margin-bottom: 6vw;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #bdbdbd;
}
</style>
