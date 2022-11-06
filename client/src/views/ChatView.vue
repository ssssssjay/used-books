<template>
  <div>
    <div class="container">
      <div class="content-box">
        <div class="aside"></div>
        <div class="main"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.content-box {
  margin-top: 20px;
  width: 1300px;
  height: 90vh;
  display: grid;
  grid-template-columns: 2fr 10fr;
  grid-template-areas: "aside main";
  gap: 5px;
}
.aside {
  grid-area: aside;
  border: 1px solid black;
  border-radius: 4px;
}
.main {
  grid-area: main;
  border: 1px solid black;
  border-radius: 4px;
}
</style>
