<template>
  <div>
    <div class="main-search-wrapper">
      <input
        class="main-search-inp"
        type="text"
        placeholder="검색어를 입력하세요"
        :value="searchBookQuery"
        @input="searchBook" />
      <button class="main-search-btn"><i class="bi bi-search h5"></i></button>
    </div>
    <ul class="list-group position-absolute mt-1" v-if="bookSearchResults">
      <p class="list-group-item list-group-item-action" v-if="false">error!</p>
      <p
        class="list-group-item list-group-item-action"
        v-if="bookSearchResults.length === 0">
        no matching!
      </p>
      <template v-else>
        <li
          class="list-group-item list-group-item-action"
          v-for="book in bookSearchResults"
          :key="book">
          {{ book.title }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const searchBookQuery = ref("");
const queryTimeout = ref(0);
const bookSearchResults = ref<null | any>(null);

const searchBook = (e: Event) => {
  searchBookQuery.value = (e.target as HTMLInputElement).value;
  clearTimeout(queryTimeout.value);
  // 셋 타임 아웃은 고유 아이디를 뱉어냅니다
  // 이 고유 아이디를 클리어 타임아웃에 넣어주면 실행을 취소 합니다
  queryTimeout.value = setTimeout(async () => {
    if (searchBookQuery.value !== "") {
      const result = await axios.get("http://localhost:3000/book/search", {
        params: {
          q: searchBookQuery.value,
        },
      });
      console.log(result.data.item);
      bookSearchResults.value = result.data.item;
    } else {
      bookSearchResults.value = null;
    }
  }, 800);
};
</script>

<style scoped>
.main-search-wrapper {
  position: relative;
}
.main-search-inp {
  width: 100%;
  padding: 14px 24px;
  border-radius: 28px;
  line-height: 22px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: box-shadow 0.2s ease-in-out;
}
.main-search-inp:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 12px 18px;
}
.main-search-inp:focus {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 8px 12px;
  outline: solid #457e2b;
}
.main-search-btn {
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translateY(-45%);
}
</style>
