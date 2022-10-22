<template>
  <div class="container p-0 col-10">
    <h1 class="fs-4 py-4 my-4">
      <span class="fw-bold">jayss </span>님이 모아왔던 책들이에요
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
        <li v-for="i in 10" :key="i">
          <BookCard></BookCard>
        </li>
      </ol>
    </section>
    <section
      v-show="typeOfBook.isUsedBook"
      class="sect-used-book p-4 border border-top-0 rounded-bottom">
      <ul>
        <li v-for="i in 5" :key="i">
          <UsedBookCard></UsedBookCard>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import BookCard from "@/components/BookCard.vue";
import UsedBookCard from "@/components/UsedBookCard.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
console.log(route);
console.log(route.path);
console.log(route.query);
console.log(route.hash);
console.log(route.params);

const router = useRouter();

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
  console.log("type changed");
  router.push({
    name: "Library",
    query: {
      type,
    },
  });
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
</style>
