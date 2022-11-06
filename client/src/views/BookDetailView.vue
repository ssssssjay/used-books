<template>
  <div>
    <div class="container">
      <div class="content-box">
        <div class="title">
          <div class="book-category mb-2">{{ bookData.bookCategory }}</div>
          <div class="book-title">
            {{ bookData.title }}
          </div>
        </div>
        <div class="sub">
          <div class="book-pubdate">출판일 : {{ bookData.pubDate }}</div>
          <div class="book-publisher">출판사 : {{ bookData.publisher }}</div>
          <div class="book-author">작가 : {{ bookData.author }}</div>
          <div class="book-price">정가 : {{ bookData.price }}원</div>
        </div>

        <div class="img">
          <img v-bind:src="bookData.imgUrl[0]" alt="..." />
        </div>
        <div class="des">
          <div class="book-des" v-html="bookData.des"></div>
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
export default {
  components: {},
  data() {
    return {
      bookData: {
        bookCategory: "개발/프로그래밍",
        title: "리액트를 다루는 기술",
        author: "김민준",
        publisher: "(주) 도서출판 길벗",
        pubDate: "2022년 09월 22일",
        price: 39000,
        des: "<p>PROMENTOUS V2 입니다.&nbsp;</p><p><br></p><p>기존의 메인 페이지는 게시판들을 모아 놓은 인상이 강하여</p><p>서비스를 소개하는 페이지로 새단장 하였습니다.</p><p>개선된 글 작성 기능을 소개합니다</p><p><br></p><p>필수요건 필터링 분기처리를 추가하여, 어떤 필수조건이 누락되었는지 알 수 있게 되었습니다.</p><p>정규표현식 추가를 통해 오류가 나는 일부 상황을 해결하였습니다.</p><p>개선된 모집 게시판을 소개합니다</p><p><br></p><p>실제 DB와 연동시 응답시간이 늘어난 현상을 로딩 화면과 기능을 구현하여 해결했습니다.</p><p>열람중인 페이지를 알 수 없던 부분을, 시각적으로 알 수 있도록 풀어냈습니다.</p><p>개선된 팀 관리 페이지를 소개합니다</p><p><br></p><p>전체적으로 UI를 개선했습니다.</p><p>완료된 프로젝트에 한해서, 동료평가 기능을 추가 구현했습니다.</p><p>그 외의 개선사항들을 소개합니다</p><p><br></p><p>페이지별로 분리되어 있던 모달 컴포넌트를 하나의 컴포넌트로 통합하였습니다.</p><p>평가기능 구현과 동시에 프로필 모달 창에서도 유저의 평판 점수를 확인할 수 있게 되었습니다.</p><p>외부 라이브러리를 사용할 때, 필요한 부분만 사용하도록 세팅을 바꾸었습니다.</p><p>vue3-editor, vue-datepicker, vue-star-rating</p><h1><br></h1>",
        imgUrl: [
          "https://user-images.githubusercontent.com/89081441/195911630-23a4ab4d-5314-4071-aeff-daad17b470f2.png",
          "https://user-images.githubusercontent.com/89081441/195911637-2389b329-0503-40dc-84be-ce95cac81d05.png",
          "https://user-images.githubusercontent.com/89081441/195911641-207ac87f-2b00-420e-a43d-d44ff3da4d21.png",
        ],
      },
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
