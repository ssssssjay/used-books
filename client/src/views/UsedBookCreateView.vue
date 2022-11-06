<template>
  <div class="container py-5">
    <form>
      <label class="h5" for="main-search-inp">책 제목을 검색하세요</label>
      <!-- props로 type을 넘겨주는 방식? - 홈화면, 헤더, 중고등록 -->
      <BookSearchInput></BookSearchInput>
      <label for="" class="h5">판매를 진행하실 위치를 알려주세요</label>
      <input type="text" id="" />
      <p class="h5">상품의 상태를 체크해주세요</p>
      <p>책의 전반적인 상태를 알려주세요</p>
      <label for="1">좋음</label>
      <input type="radio" name="condition" value="high" id="1" />
      <input type="radio" name="condition" value="middle" id="" />
      <input type="radio" name="condition" value="low" id="" />
      <p>책의 찢어짐 상태를 알려주세요</p>
      <input type="radio" name="tear" id="" />
      <input type="radio" name="tear" id="" />
      <input type="radio" name="tear" id="" />
      <p>책의 오염 여부를 알려주세요</p>
      <input type="radio" name="pollute" id="" />
      <input type="radio" name="pollute" id="" />
      <input type="radio" name="pollute" id="" />
      <p>책의 낙서 여부를 알려주세요</p>
      <input type="radio" name="doodle" id="" />
      <input type="radio" name="doodle" id="" />
      <input type="radio" name="doodle" id="" />
      <p class="h5" for="">책의 사진을 올리시면 더욱 좋아요</p>

      <p class="h5" for="">가격을 입력해주세요</p>
      <input type="text" id="" />
      <p class="h5" for="">상품의 소개 및 상태등을 입력해주세요</p>
      <textarea class="border" name="" id=""></textarea>
    </form>
    <button>등록하기</button>
  </div>
</template>

<script setup lang="ts">
import BookSearchInput from "@/components/BookSearchInput.vue";
</script>

<style scoped></style>
