<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const emit = defineEmits(["emitMapRouter", "emitMapRender"]);

const props = defineProps({
  usedBookList: Array,
});

const router = useRouter();

let map;

onMounted(() => {
  let container = document.querySelector("#map");
  // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
  if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {
      const [lat, lon] = [position.coords.latitude, position.coords.longitude]; // 위도, 경도
      const options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 6,
      };
      // const map = new kakao.maps.Map(container.value, options);
      map = new kakao.maps.Map(container, options);
      // container = new kakao.maps.Map(container, options);
      // ===========================================================
      var bounds = map.getBounds();

      // 영역정보의 남서쪽 정보를 얻어옵니다
      var swLatlng = bounds.getSouthWest();
      // 영역정보의 북동쪽 정보를 얻어옵니다
      var neLatlng = bounds.getNorthEast();
      // ===========================================================
      var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      var message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

      // 마커와 인포윈도우를 표시합니다
      props.usedBookList?.forEach((el) => {
        let lat = Number(JSON.parse(el.coordination)[1]);
        let lon = Number(JSON.parse(el.coordination)[0]);
        let bookLocPosition = new kakao.maps.LatLng(lat, lon);
        if (
          swLatlng.La <= lon &&
          lon <= neLatlng.La &&
          swLatlng.Ma <= lat &&
          lat <= neLatlng.Ma
        ) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: bookLocPosition, // 마커의 위치
            clickable: true,
          });

          // 마커에 표시할 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: `<div style='width: 250px;'>
               <div class='info-title' id='info-title'>${el.title}</div>
              </div>`,
          });

          // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
          // 이벤트 리스너로는 클로저를 만들어 등록합니다
          // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
          kakao.maps.event.addListener(
            marker,
            "mouseover",
            makeOverListener(map, marker, infowindow)
          );
          kakao.maps.event.addListener(
            marker,
            "mouseout",
            makeOutListener(infowindow)
          );
          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", function () {
            emit("emitMapRouter", el.product_id);
          });
          emit("emitMapRender", el);
          // map.setZoomable(false);
          // map.setDraggable(false);
        }
      });
      // displayMarker(locPosition, message);
    });
  } else {
    // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    let locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    let message = "geolocation을 사용할수 없어요..";

    displayMarker(locPosition, message);
  }
  // 지도에 마커와 인포윈도우를 표시하는 함수입니다
  function displayMarker(locPosition, message) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    var iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    map.setCenter(locPosition);
    map.setZoomable(false);
    map.setDraggable(false);
  }
  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다
  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 50vh;
}
.wrap {
  border-radius: 4px;
}
.info-title {
  color: aqua;
}
</style>
