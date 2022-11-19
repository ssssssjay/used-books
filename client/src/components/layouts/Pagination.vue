<template>
  <div>
    <div v-if="pageSetting.list.length" aria-label="Page navigation example">
      <i
        class="bi bi-chevron-double-left"
        v-if="pageSetting.first !== null"
        color="#dfdfdf"
        @click="pageSetting.first !== null ? sendPage(pageSetting.first) : ''">
      </i>

      <ul class="pagination">
        <li
          class="page-item"
          :class="{ active: page === pageSetting.currentPage }"
          v-for="page in pageSetting.list"
          :key="page">
          <button class="page-link" @click="sendPage(page)">{{ page }}</button>
        </li>
      </ul>
      <i
        class="bi bi-chevron-double-right"
        v-if="pageSetting.end !== null"
        color="#dfdfdf"
        @click="pageSetting.end !== null ? sendPage(pageSetting.end) : ''"></i>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["pageSetting"],

  methods: {
    sendPage(page: number) {
      this.$emit("paging", page);
    },
  },
};
</script>
<style scoped></style>
