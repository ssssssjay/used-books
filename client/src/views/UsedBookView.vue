<template>
  <div class="container">
    <section class="sect-brief">
      <div class="col-3 d-inline-block">
        <img src="@/assets/book-image-sample.webp" alt="책이미지예시" />
      </div>
      <div class="col-9 d-inline-block">
        <div>컴퓨터/IT</div>
        <h3>모던 자바스크립트 딥다이브</h3>
        <div>이웅모</div>
        <div>위키북스</div>
        <dl>
          <dt>정가</dt>
          <dd>20,000원</dd>
          <dt>중고판매가</dt>
          <dd>7,000원</dd>
        </dl>
      </div>
      <table class="table table-striped text-center">
        <thead>
          <tr class="">
            <th scope="col"></th>
            <th scope="col">나쁨</th>
            <th scope="col">보통</th>
            <th scope="col">좋음</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
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
      <div>
        <button>찜하기</button>
        <button>구매하기</button>
        <button>채팅하기</button>
      </div>
    </section>
    <section class="sect-detail">
      <h1>물품 소개글</h1>
      <div>
        <div class="col-3 d-inline-block">
          <img src="@/assets/book-image-sample.webp" alt="책이미지예시" />
        </div>
        <div class="col-3 d-inline-block">
          <img src="@/assets/book-image-sample.webp" alt="책이미지예시" />
        </div>
        <div class="col-3 d-inline-block">
          <img src="@/assets/book-image-sample.webp" alt="책이미지예시" />
        </div>
      </div>
      <span
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        aliquid earum eum pariatur a ad doloremque nam similique numquam,
        consequuntur aperiam maxime? Autem accusamus eligendi mollitia incidunt
        neque dolore asperiores!</span
      >
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
img {
  width: 100%;
}
</style>
