<template>
  <div class="container py-5">
    <form class="col-10 m-auto" @submit.prevent="registerUsedBookData">
      <label class="h5" for="main-search-inp">책 제목을 검색하세요</label>
      <BookSearchInput @send-book-id="getBookId"></BookSearchInput>
      <label for="" class="h5">판매를 진행하실 위치를 알려주세요</label>
      <div
        class="btn btn-secondary address-search ms-2"
        @click="execDaumPostcode()">
        우편번호찾기
      </div>
      <div class="input-group flex-nowrap address mb-3">
        <span class="input-group-text input-address-title" id="addon-wrapping"
          >주소
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          v-model="address"
          disabled />
      </div>
      <h3 class="h5">상품의 상태를 체크해주세요</h3>
      <!-- TODO: 선택된 상태에서 클릭시 해제가 안되는 경우 해결 -->
      <p>책의 전반적인 상태를 알려주세요</p>
      <div class="select">
        <input
          id="condition-up-radio"
          type="radio"
          name="condition"
          value="U"
          v-model="usedBookDataForRegister.total_status" />
        <label for="condition-up-radio">좋아요</label>
        <input
          id="condition-mid-radio"
          type="radio"
          name="condition"
          value="M"
          v-model="usedBookDataForRegister.total_status" />
        <label for="condition-mid-radio">보통이에요</label>
        <input
          id="condition-low-radio"
          type="radio"
          name="condition"
          value="L"
          v-model="usedBookDataForRegister.total_status" />
        <label for="condition-low-radio">좋지않아요</label>
      </div>
      <p>책의 찢어짐 상태를 알려주세요</p>
      <div class="select">
        <input
          id="tear-up-radio"
          type="radio"
          name="tear"
          value="U"
          v-model="usedBookDataForRegister.tear_status" />
        <label for="tear-up-radio">좋아요</label>
        <input
          id="tear-mid-radio"
          type="radio"
          name="tear"
          value="M"
          v-model="usedBookDataForRegister.tear_status" />
        <label for="tear-mid-radio">보통이에요</label>
        <input
          id="tear-low-radio"
          type="radio"
          name="tear"
          value="L"
          v-model="usedBookDataForRegister.tear_status" />
        <label for="tear-low-radio">좋지않아요</label>
      </div>

      <p>책의 오염 여부를 알려주세요</p>
      <div class="select">
        <input
          id="pollute-up-radio"
          type="radio"
          name="pollute"
          value="U"
          v-model="usedBookDataForRegister.pollution_status" />
        <label for="pollute-up-radio">좋아요</label>
        <input
          id="pollute-mid-radio"
          type="radio"
          name="pollute"
          value="M"
          v-model="usedBookDataForRegister.pollution_status" />
        <label for="pollute-mid-radio">보통이에요</label>
        <input
          id="pollute-low-radio"
          type="radio"
          name="pollute"
          value="L"
          v-model="usedBookDataForRegister.pollution_status" />
        <label for="pollute-low-radio">좋지않아요</label>
      </div>
      <p>책의 낙서 여부를 알려주세요</p>
      <div class="select">
        <input
          id="doodle-up-radio"
          type="radio"
          name="doodle"
          value="U"
          v-model="usedBookDataForRegister.doodle_status" />
        <label for="doodle-up-radio">좋아요</label>
        <input
          id="doodle-mid-radio"
          type="radio"
          name="doodle"
          value="M"
          v-model="usedBookDataForRegister.doodle_status" />
        <label for="doodle-mid-radio">보통이에요</label>
        <input
          id="doodle-low-radio"
          type="radio"
          name="doodle"
          value="L"
          v-model="usedBookDataForRegister.doodle_status" />
        <label for="doodle-low-radio">좋지않아요</label>
      </div>
      <p class="h5" for="">책의 사진을 올리시면 더욱 좋아요</p>

      <p class="h5" for="">가격을 입력해주세요</p>
      <input
        type="number"
        class="form-control"
        v-model="usedBookDataForRegister.price" />
      <p class="h5" for="">상품의 소개 및 상태등을 입력해주세요</p>
      <textarea
        class="border"
        :value="usedBookDataForRegister.description"
        @input="changeDescriptionInput"></textarea>
      <button type="submit" class="btn btn-outline-success">등록하기</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import BookSearchInput from "@/components/BookSearchInput.vue";
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const usedBookDataForRegister = ref({
  // TODO: image_url_1
  seller_user_id: store.state.userInfo.user_id,
  seller_user_nickname: store.state.userInfo.user_nickname,
  book_id: "",
  location: "",
  coordination: "",
  total_status: null,
  tear_status: null,
  pollution_status: null,
  doodle_status: null,
  image_url_1: "https://img.ridicdn.net/cover/1160000024/xxlarge?dpi=xxhdpi#1",
  price: null,
  description: "",
});

const registerUsedBookData = async () => {
  // TODO: validation, error handle
  const result = await axios.post("http://localhost:3000/used-book/create", {
    param: usedBookDataForRegister.value,
  });
  moveToProductDetail(result.data.insertId);
};

const changeDescriptionInput = (e) => {
  usedBookDataForRegister.value.description = e.target.value;
};

const extraAddress = ref("");
const address = ref("");
const postcode = ref("");
const execDaumPostcode = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      if (extraAddress.value !== "") {
        extraAddress.value = "";
      }
      if (data.userSelectedType === "R") {
        address.value = data.roadAddress;
      } else {
        address.value = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddress.value += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddress.value +=
            extraAddress.value !== ""
              ? `, ${data.buildingName}`
              : data.buildingName;
        }
        if (extraAddress.value !== "") {
          extraAddress.value = `(${extraAddress.value})`;
        }
      } else {
        extraAddress.value = "";
      }
      postcode.value = data.zonecode;
      transLatLon(data.roadAddress);
    },
  }).open();
};
const transLatLon = async (data: any) => {
  let options = {
    method: "GET",
    headers: {
      Authorization: "KakaoAK 50bbb5205dc8fcc9c2611542015a54d5",
    },
  };
  let result = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${data}`,
    options
  );
  const json = await result.json();
  const addressName = json.documents[0].address_name;
  const coordination = [json.documents[0].x, json.documents[0].y];
  const stringifiedCooedination = JSON.stringify(coordination);
  usedBookDataForRegister.value.coordination = stringifiedCooedination;
  usedBookDataForRegister.value.location = addressName;
};

const getBookId = (id) => {
  usedBookDataForRegister.value.book_id = id;
};

const router = useRouter();
const moveToProductDetail = (productId) => {
  router.push({
    name: "UsedBook",
    query: {
      id: productId,
    },
  });
};
</script>

<style scoped>
:disabled {
  background: white;
}
.select {
  padding: 15px 10px;
}
.select input[type="radio"] {
  display: none;
}
.select input[type="radio"] + label {
  display: inline-block;
  cursor: pointer;
  height: 24px;
  width: 90px;
  border: 1px solid #333;
  border-radius: 12px;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  font-size: 13px;
  margin-right: 1rem;
}
.select input[type="radio"] + label:last-child {
  margin-right: 0;
}
.select input[type="radio"] + label {
  background-color: #fff;
  color: #333;
}
.select input[type="radio"]:checked + label {
  background-color: #333;
  color: #fff;
}

textarea {
  resize: none;
  width: 100%;
  height: 6em;
}
</style>
