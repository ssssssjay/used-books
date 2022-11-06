<template>
  <div>
    <div class="bg">
      <div class="container">
        <div class="content-box">
          <div class="main">
            <div class="sort">
              <span class="dropdown">
                <a
                  class="btn btn-secondary dropdown-toggle"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <span>정렬</span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <div class="dropdown-item mb-1">관련도(기본값)</div>
                  </li>
                  <li>
                    <div class="dropdown-item mb-1">출간일</div>
                  </li>
                  <li>
                    <div class="dropdown-item mb-1">제목</div>
                  </li>
                  <li>
                    <div class="dropdown-item mb-1">판매량</div>
                  </li>
                </ul>
              </span>
            </div>
            <div class="book-card" v-for="i in 10" :key="i">
              <BookCard></BookCard>
            </div>
            <div class="pag"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BookCard from "../components/BookCard.vue";

export default {
  components: { BookCard },
  data() {
    return {
      searchData: [{ bookName: "" }],
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {},
};
</script>

<style scoped>
.content-box {
  width: 1440px;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 7fr;
  grid-template-areas:
    "aside main"
    "aside main";
  padding: 30px;
}
.aside {
  grid-area: aside;
  border: 2px solid #dae0e5;
  border-radius: 5px;
  height: 30%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.radio {
  width: 120px;
  margin-bottom: 20px;
  font-size: 15px;
}
.main {
  grid-area: main;
  display: flex;
  flex-wrap: wrap;
  height: 90%;
}
.sort {
  width: 100%;
  height: 50px;
  margin-left: 20px;
}
.book-card {
  width: 200px;
  margin: 20px;
}
.pag {
  width: 100%;
  height: 50px;
}
</style>
