<template>
  <div class="container">
    <div class="m-auto p-0 col-10">
      <h1 class="fs-4 py-4 my-4">
        <span class="fw-bold">{{ store.state.userInfo.user_nickname }} </span
        >님이 모아왔던 책들이에요
      </h1>
      <nav>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button
              class="nav-link rounded-top"
              @click="typeChange('book')"
              :class="{ active: typeOfBook.isBook }">
              관심도서
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link rounded-top"
              @click="typeChange('used')"
              :class="{ active: typeOfBook.isUsedBook }">
              관심 중고도서
            </button>
          </li>
        </ul>
      </nav>
      <section
        v-show="typeOfBook.isBook"
        class="sect-book p-4 border border-top-0 rounded-bottom">
        <ol class="d-flex flex-wrap">
          <li v-for="likeBook in likeBookList" :key="likeBook.book_id">
            <BookCard
              :category="likeBook.categoryName"
              :imgPath="likeBook.cover"
              :title="likeBook.title"
              :author="likeBook.author"
              @click="routerMove(likeBook.isbn13)"></BookCard>
          </li>
        </ol>
      </section>
      <section
        v-show="typeOfBook.isUsedBook"
        class="sect-used-book p-4 border border-top-0 rounded-bottom">
        <ul>
          <li
            class="card-used_book"
            v-for="likeUsedBook in likeUsedBookList"
            :key="likeUsedBook.product_id">
            <UsedBookCard
              v-bind="likeUsedBook"
              @click="routerMove(likeUsedBook.product_id)"></UsedBookCard>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import BookCard from "@/components/BookCard.vue";
import UsedBookCard from "@/components/UsedBookCard.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

const likeUsedBookList = ref([]);
const likeBookList = ref([]);

onMounted(() => {
  likeUsedBookList.value = store.state.likeUsedBookList;
  likeBookList.value = store.state.likeBookList;
});

const typeOfBook = ref({
  isBook: computed(() => {
    if (route.query.type === undefined) {
      return true;
    }
    return route.query.type === "book" ? true : false;
  }),
  isUsedBook: computed(() => {
    return route.query.type === "used" ? true : false;
  }),
});

const typeChange = (type: string) => {
  router.push({
    name: "Library",
    query: {
      type,
    },
  });
};

const routerMove = (id) => {
  if (typeOfBook.value.isUsedBook) {
    router.push({
      name: "UsedBook",
      query: {
        id: id,
      },
    });
  }
  if (typeOfBook.value.isBook) {
    router.push({
      name: "book",
      query: {
        id: id,
      },
    });
  }
};
</script>

<style scoped>
.d-flex {
  gap: 10px;
}
.nav-item {
  width: 50%;
}
.nav-link {
  padding-block: 16px;
  background-color: #f2f4f5;
  width: 100%;
  color: #808991;
}
.nav-link.active {
  font-weight: 600;
  color: black;
}
.card-used_book {
  margin-bottom: 0.8rem;
}
.card-used_book:last-child {
  margin-bottom: 0;
}
</style>
