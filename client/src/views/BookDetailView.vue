<template>
  <div>
    <div class="container">
      {{ bookNum }}
      <div class="content-box">
        <div class="title">
          <div class="book-category mb-2">{{ bookData.categoryName }}</div>
          <div class="book-title">
            {{ bookData.title }}
          </div>
        </div>
        <div class="sub">
          <div class="book-pubdate">출판일 : {{ bookData.pubDate }}</div>
          <div class="book-publisher">출판사 : {{ bookData.publisher }}</div>
          <div class="book-author">작가 : {{ bookData.author }}</div>
          <div class="book-price">정가 : {{ bookData.priceStandard }}원</div>
        </div>

        <div class="img">
          <img v-bind:src="bookData.cover" alt="..." />
        </div>
        <div class="des">
          <div class="book-des" v-html="bookData.description"></div>
        </div>
        <div class="used">
          <div class="used-title">중고 리스트</div>
          <div class="used">
            <div class="used-info">
              <div class="used-img" :key="i" v-for="(used, i) in usedList">
                <img v-bind:src="used.imgUrl" alt="" />
                <div class="used-des">
                  <div class="status mb-1">책 상태: {{ used.status }}</div>
                  <div class="price mb-1">책 가격: {{ used.price }}</div>
                  <div class="location mb-1">
                    {{ used.location }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="best">
          <div class="bs-title">{{ bookData.bookCategory }} 베스트 셀러</div>
          <div class="img-list">
            <div class="product" :key="i" v-for="(product, i) in bestSeller">
              <img v-bind:src="product.imgUrl" alt="" />
              <div class="product-title">{{ product.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useRoute } from "vue-router";

export default {
  components: {},
  data() {
    return {
      bookData: {},
      usedList: [
        {
          status: "상",
          location: "경기도 성남시",
          price: 20000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "중",
          location: "경기도 성남시",
          price: 30000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "하",
          location: "경기도 성남시",
          price: 40000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "중",
          location: "경기도 성남시",
          price: 10000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "상",
          location: "경기도 성남시",
          price: 20000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "중",
          location: "경기도 성남시",
          price: 30000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "하",
          location: "경기도 성남시",
          price: 40000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "중",
          location: "경기도 성남시",
          price: 10000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "상",
          location: "경기도 성남시",
          price: 20000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "중",
          location: "경기도 성남시",
          price: 30000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "하",
          location: "경기도 성남시",
          price: 40000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "중",
          location: "경기도 성남시",
          price: 10000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "상",
          location: "경기도 성남시",
          price: 20000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "중",
          location: "경기도 성남시",
          price: 30000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "하",
          location: "경기도 성남시",
          price: 40000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
        {
          status: "중",
          location: "경기도 성남시",
          price: 10000,
          nickname: "evelo",
          imgUrl:
            "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
        },
      ],
      bestSeller: [
        {
          title: "역행자",
          imgUrl: "http://image.yes24.com/goods/109705390/XL",
        },
        {
          title: "하얼빈 ",
          imgUrl: "http://image.yes24.com/goods/111085946/XL",
        },
        {
          title: "불편한 편의점2",
          imgUrl: "http://image.yes24.com/goods/111088149/XL",
        },
        {
          title: "세상의 마지막 기차역",
          imgUrl:
            "https://img.ridicdn.net/cover/4239000048/xxlarge?dpi=xxhdpi#1",
        },
        {
          title: "하얼빈 ",
          imgUrl: "http://image.yes24.com/goods/111085946/XL",
        },
        {
          title: "불편한 편의점2",
          imgUrl: "http://image.yes24.com/goods/111088149/XL",
        },
      ],
      pageUrl: "",
      bookNum: "",
    };
  },
  setup() {},
  created() {},
  mounted() {
    const route = useRoute();
    const bookId = route.query.id;
    this.getBookDetailData(bookId);
  },
  unmounted() {},
  methods: {
    async getBookDetailData(bookId) {
      const result = await this.$get(
        `http://localhost:3000/book/detail?id=${bookId}`
      );
      this.bookData = result.item[0];
    },
  },
};
</script>
<style scoped>
.content-box {
  width: 1300px;
  height: 100vh;
  display: grid;
  grid-template-columns: 7fr 10fr;
  grid-template-rows: 1fr 3fr 2fr 2fr;
  grid-template-areas:
    "title sub"
    "img des"
    "used used"
    "best best";
}

.title {
  grid-area: title;
  margin-top: 50px;
  margin-left: 10px;
  height: 100%;
}
.book-title {
  font-size: 30px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 30px;
}
.sub {
  grid-area: sub;
  height: 100%;
  font-size: 16px;
  margin-top: 30px;
  margin-left: 10px;
  line-height: 30px;
}

.img {
  grid-area: img;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img > img {
  width: 300px;
  height: 400px;
}
.des {
  height: 100%;
  grid-area: des;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  line-height: 25px;
  overflow-y: auto;
}
.used {
  grid-area: used;
}
.used-title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
}

div .used-info {
  background: #e3e3e3;
  width: 100%;
  height: 270px;
  display: inline-flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.used-tt {
  font-size: 15px;
}

.used-img > img {
  margin: 10px 30px;
  width: 100px;
  height: 150px;
}
.used-des {
  margin-left: 30px;
  line-height: 20px;
}
.best {
  grid-area: best;
  height: 350px;
}

.bs-title {
  font-size: 25px;
  font-weight: bold;
  margin: 15px 0px;
}
.img-list {
  width: 100%;
  height: 250px;
  display: inline-flex;
  flex-wrap: nowrap;
}
.product > img {
  margin: 10px;
  width: 200px;
  height: 250px;
}
.product-title {
  text-align: center;
}
</style>
