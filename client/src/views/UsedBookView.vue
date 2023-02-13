<template>
  <div class="container">
    <section class="mt-4 d-flex sect-brief col-10 m-auto">
      <div class="col-5 me-auto">
        <!-- <img :src="usedBookData.cover" alt="책이미지예시" /> -->
        <img class="img-cover" :src="imgCover" alt="" />
        <img
          class="prev-img ms-2"
          v-for="(img, i) in imgSrc"
          :key="i"
          :src="img"
          alt=""
          @click="changeCover(img)" />
      </div>
      <div class="col-8">
        <div class="text-muted mb-4">{{ usedBookData.categoryName }}</div>
        <div class="book-name">
          <h3 class="h3 mb-4">
            {{ usedBookData.title }}
            <button
              class="go-detail"
              @click="moveToBookDetail(usedBookData.book_id)">
              책보러가기
            </button>
          </h3>
        </div>

        <div class="mb-3">{{ usedBookData.author }}</div>
        <div class="mb-4">{{ usedBookData.publisher }}</div>
        <p class="fs-5 mb-4">
          <span class="text-success">{{
            usedBookData.seller_user_nickname
          }}</span
          >님이 <span class="text-success"> {{ usedBookData.location }}</span
          >에서 판매중이에요
        </p>
        <hr />
        <table class="table table-bordered text-center mb-4">
          <tbody>
            <tr scope="row">
              <td>정가</td>
              <td>{{ usedBookData.priceStandard }}원</td>
            </tr>
            <tr>
              <td>중고판매가</td>
              <td>{{ usedBookData.price }}원</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <table class="table table-striped table-bordered text-center">
          <thead>
            <tr class="">
              <th scope="col" class="col-2"></th>
              <th scope="col" class="col">나쁨</th>
              <th scope="col" class="col">보통</th>
              <th scope="col" class="col">좋음</th>
            </tr>
          </thead>
          <tbody class="">
            <tr class="">
              <th scope="row">책 상태</th>
              <td>{{ usedBookData.total_status === "L" ? "O" : "" }}</td>
              <td>{{ usedBookData.total_status === "M" ? "O" : "" }}</td>
              <td>{{ usedBookData.total_status === "U" ? "O" : "" }}</td>
            </tr>
            <tr class="">
              <th scope="row">찢어짐</th>
              <td>{{ usedBookData.tear_status === "L" ? "O" : "" }}</td>
              <td>{{ usedBookData.tear_status === "M" ? "O" : "" }}</td>
              <td>{{ usedBookData.tear_status === "U" ? "O" : "" }}</td>
            </tr>
            <tr class="">
              <th scope="row">오염 여부</th>
              <td>{{ usedBookData.pollution_status === "L" ? "O" : "" }}</td>
              <td>{{ usedBookData.pollution_status === "M" ? "O" : "" }}</td>
              <td>{{ usedBookData.pollution_status === "U" ? "O" : "" }}</td>
            </tr>
            <tr class="">
              <th scope="row">낙서 여부</th>
              <td>{{ usedBookData.doodle_status === "L" ? "O" : "" }}</td>
              <td>{{ usedBookData.doodle_status === "M" ? "O" : "" }}</td>
              <td>{{ usedBookData.doodle_status === "U" ? "O" : "" }}</td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="store.state.userInfo.user_id !== usedBookData.seller_user_id"
          class="float-end">
          <button
            class="btn btn-outline-success btn-add-library me-1"
            @click="divertAddOrDelete"
            v-bind:disabled="
              usedBookData.seller_user_id == store.state.userInfo.user_id ||
              !store.state.isLogin
            ">
            <i v-show="!isLibraryCart" class="bi bi-bag-check"></i>
            <i v-show="isLibraryCart" class="bi bi-bag-check-fill"></i>
          </button>
          <button
            class="btn btn-success me-1"
            v-bind:disabled="
              usedBookData.seller_user_id == store.state.userInfo.user_id ||
              !store.state.isLogin
            ">
            구매하기
          </button>
          <button
            class="btn btn-success"
            @click="goToChat()"
            v-bind:disabled="
              usedBookData.seller_user_id == store.state.userInfo.user_id ||
              !store.state.isLogin
            ">
            채팅하기
          </button>
        </div>
        <div
          class="alert alert-primary no-login"
          v-show="!store.state.isLogin"
          role="alert">
          해당 중고책을 문의, 구매하기를 원한다면
          <a href="#" class="alert-link">로그인</a>을 해주세요
        </div>
      </div>
    </section>
    <main class="sect-detail col-10 m-auto mb-2 mt-4">
      <h1 class="h4 mb-4">물품 소개글</h1>
      <hr class="mb-4" />
      <span class="lh-base des">{{ usedBookData.description }}</span>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import router from "@/router";
import io from "socket.io-client";

const socket = io("http://localhost:3000");
const store = useStore();
const route = useRoute();

const usedBookData = ref({
  product_id: 0,
  book_id: "",
  seller_user_id: 0,
  seller_user_nickname: "",
  total_status: "",
  tear_status: "",
  pollution_status: "",
  doodle_status: "",
  price: 0,
  location: "",
  coordination: "",
  sold_out: 0,
  is_online: 0,
  description: "",
  created_at: "",
  image_url_1: "",
  image_url_2: null,
  image_url_3: null,
});
let imgSrc = ref(null);
let user_list = "";
let rev_user_list = "";
let chat_id = ref("");
let imgCover = ref("");
const bookData = ref({
  title: "",
  author: "",
  cover: "",
  categoryName: "",
  publisher: "",
  priceStandard: "",
});
let room_id = "";
const isLibraryCart = computed(() => {
  return store.state.likeUsedBookList.some(
    (uesdBook) => uesdBook.product_id === usedBookData.value.product_id
  );
});
const moveToBookDetail = (bookId: number) => {
  window.scrollTo(0, 0);
  router.push({
    name: "book",
    query: {
      id: bookId,
    },
  });
  // getBookDetailData(bookId);
};

const divertAddOrDelete = () => {
  if (isLibraryCart.value === false) {
    addLibrary();
  } else {
    deleteLibrary();
  }
};

const addLibrary = async () => {
  const result = await axios.post("http://localhost:3000/library/createUsed", {
    param: {
      book_id: usedBookData.value.book_id,
      user_id: store.state.userInfo.user_id,
      product_id: usedBookData.value.product_id,
    },
  });
  if (result.status === 200) {
    store.commit("addLikeUsedBookList", usedBookData.value);
    alert("찜하기 완료");
  }
  if (result.status !== 200) {
    alert("찜하기 실패!");
  }
};

const deleteLibrary = async () => {
  const result = await axios.delete(
    "http://localhost:3000/library/deleteUsed",
    {
      params: {
        book_id: usedBookData.value.book_id,
        user_id: store.state.userInfo.user_id,
        product_id: usedBookData.value.product_id,
      },
    }
  );
  if (result.status === 200) {
    store.commit("deleteLikeUsedBookList", usedBookData.value.product_id);
    alert("찜하기 취소");
  }
  if (result.status !== 200) {
    console.log("찜하기 취소 실패!");
  }
};

const usedBookId = route.query.id;
const getUsedBookData = async () => {
  // TODO: id에 의거한 요청, 에러핸들링, 에외처리
  const result = await axios.get("http://localhost:3000/used-book", {
    params: {
      id: usedBookId,
    },
  });
  usedBookData.value = result.data[0];
  imgSrc.value = usedBookData.value.image_url_1.split(",");
  imgCover.value = imgSrc.value[0];
  getBookData(result.data[0].book_id);
  user_list = String([
    usedBookData.value.seller_user_id,
    store.state.userInfo.user_id,
  ]);
  rev_user_list = String(user_list.split(",").reverse());
  if (result.status === 200) {
    usedBookData.value = result.data[0];
    getBookData(result.data[0].book_id);
    room_id =
      String(usedBookData.value.seller_user_id) +
      String(store.state.userInfo.user_id);
  }
};
const changeCover = (data: any) => {
  imgCover.value = data;
};
const goToChat = async () => {
  if (chat_id.value === "") {
    await dbRes();
  }
  await dbcheck();

  // room_id 대신 chat_id로 변경
  router.push({
    name: "chat",
    query: {
      id: await chat_id.value,
    },
  });
};
const dbcheck = async () => {
  const result2 = await axios.get("http://localhost:3000/chat", {
    params: {
      user_list,
      rev_user_list,
    },
  });
  console.log("=============chat_id=============");
  // get chat_id 를 불러오는 요청을 해야함

  if (result2.data.length > 0) {
    chat_id.value = result2.data[0].chat_id;
    console.log(chat_id.value);
  }
};
const dbRes = async () => {
  await axios.post("http://localhost:3000/chat/create", {
    param: [
      {
        user_list,
        product_id: usedBookData.value.product_id,
      },
      {
        product_id: usedBookData.value.product_id,
      },
    ],
  });
};

const getBookData = async (bookId: string) => {
  const result = await axios.get("http://localhost:3000/book/detail", {
    params: {
      id: bookId,
    },
  });
  if (result.status === 200) {
    const {
      link,
      isbn,
      itemId,
      priceSales,
      mallType,
      stockStatus,
      mileage,
      salesPoint,
      adult,
      fixedPrice,
      customerReviewRank,
      subInfo,
      description,
      ...bookData
    } = result.data.item[0];
    Object.assign(usedBookData.value, bookData);
  }
  if (result.status !== 200) {
    alert("데이터를 못 불러옵니다....");
  }
};

// 진입 시 중고책 데이터 불러오기
getUsedBookData();
</script>

<style scoped>
.btn-add-library {
  font-size: 18px;
  height: 38px;
}
.btn-add-library:hover {
  background-color: #fff;
  color: #198754;
  text-decoration: none;
}
img {
  width: 100%;
}
.sect-brief {
  margin-bottom: 6vw;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #bdbdbd;
}
.btn btn-success.disable {
}
.no-login {
  float: right;
  margin-right: 10px;
}
.used-img {
  display: flex;
}
.img-cover {
  padding: 40px;
  width: 400px;
  height: 450px;
  border-radius: 50px;
}
.prev-img {
  width: 15%;
  height: 20%;
  opacity: 60%;
  border-radius: 10px;
}
.prev-img:hover {
  opacity: 100%;
}
.book-name {
  display: flex;
}
.go-detail {
  font-size: 16px;
  background: #167421;
  color: white;
}
.des {
  font-size: 20px;
}
</style>
