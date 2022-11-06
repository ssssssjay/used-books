<template>
  <div>
    <div class="container">
      <div class="page-title">결제하기</div>
      <div class="product">
        <div class="pd-title">상품 정보</div>
        <div class="pd-content"><UsedBookCard></UsedBookCard></div>
      </div>
      <div class="address-tab">
        <div class="add-title">배송주소/ 고객정보</div>
        <div class="postcode-tab">
          <div class="input-group flex-nowrap postcode mb-3">
            <div
              class="input-group-text input-address-title"
              id="addon-wrapping">
              우편번호
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              v-model="postcode"
              disabled />
          </div>
          <div
            class="btn btn-secondary address-search ms-2"
            @click="execDaumPostcode()">
            우편번호찾기
          </div>
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
        <div class="input-group flex-nowrap detail-address mb-3">
          <span class="input-group-text input-address-title" id="addon-wrapping"
            >상세 주소</span
          >
          <input
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            v-model="detailAddress" />
        </div>
        <div class="input-group flex-nowrap detail-address mb-3">
          <span class="input-group-text input-address-title" id="addon-wrapping"
            >전화번호</span
          >
          <input
            type="tel"
            class="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            v-model="phone" />
        </div>
      </div>
      <div class="payment-method">
        <div class="payment-title">결제 방법</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UsedBookCard from "../components/UsedBookCard.vue";
export default {
  components: { UsedBookCard },
  data() {
    return {
      postcode: "",
      address: "",
      extraAddress: "",
      detailAddress: "",
      phone: "",
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            this.address = data.roadAddress;
          } else {
            this.address = data.jibunAddress;
          }

          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                this.extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          this.postcode = data.zonecode;
        },
      }).open();
    },
  },
};
</script>
<style scoped>
.container > div {
  margin-top: 30px;
}
.page-title {
  font-size: 32px;
  font-weight: bold;
}
.pd-title,
.add-title,
.payment-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: grey;
  font-weight: bold;
}
.postcode-tab {
  display: flex;
}
.postcode {
  width: 200px;
}
.address-search {
  height: 40px;
  width: 130px;
}
:disabled {
  background: white;
}
.address,
.detail-address {
  width: 700px;
}
.input-address-title {
  width: 100px;
}
</style>
