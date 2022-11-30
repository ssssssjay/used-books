<template>
  <div>
    <HeaderLayout></HeaderLayout>
    <RouterView></RouterView>
    <UsedBookCreateBtn class="btn-sticky-create"></UsedBookCreateBtn>
  </div>
</template>

<script lang="ts">
import HeaderLayout from "./components/layouts/HeaderLayout.vue";
import UsedBookCreateBtn from "./components/UsedBookCreateBtn.vue";

export default {
  setup() {
    return {};
  },
  components: { HeaderLayout, UsedBookCreateBtn },
};
</script>

<style scoped>
.btn-sticky-create {
  position: fixed;
  bottom: 10%;
  right: 5%;
}
</style>
