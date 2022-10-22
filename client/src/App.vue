<template>
  <div>
    <HeaderLayout></HeaderLayout>
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import HeaderLayout from "./components/layouts/HeaderLayout.vue";
export default {
  setup() {
    return {};
  },
  components: { HeaderLayout },
};
</script>

<style lang="scss" scoped></style>
