<template>
  <div>
    <div id="map" class="map" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const [lat, lon] = [position.coords.latitude, position.coords.longitude]; // 위도, 경도
      const options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 4,
      };
      const map = new kakao.maps.Map(container.value, options);
    });
  }
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 50vh;
}
</style>
