# used-books

> 원하는 도서의 정보조회와 채팅을 통한 거래가 가능하며, 판매를 원하는 도서의 등록이 가능한 서비스

<div>

<img src="https://user-images.githubusercontent.com/89081441/218637796-889177dd-9b0f-4bc3-ab14-970f5dbc7627.gif" width = '600' >
<br/>

</div>

<br/>

## 사용 언어

|                                                              VUE                                                              |                                                           NODE.JS                                                            |
| :---------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/300px-Vue.js_Logo_2.svg.png" width=130> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1180px-Node.js_logo.svg.png" width=130> |

## Database

<img src="http://pngimg.com/uploads/mysql/mysql_PNG35.png" width=130>

<div align="">
<img width = 600, src="https://user-images.githubusercontent.com/48425930/218376656-5b83f217-d0d9-4fc1-8d9c-561bcf617e8e.png">
</div>

## ⚙️ 사용 api & library

- kakao map API
- aladin API
- kakao login API
- daumpost API
- vuex
- AWS RDS
- AWS s3
- cors
- socket.io

## 👨‍👩‍👧‍👦 팀원 소개

|                                   곽성재                                   |                                   노영석                                   |
| :------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/48425930?v=4" width=130> | <img src="https://avatars.githubusercontent.com/u/89081441?v=4" width=130> |
|                 [@ssssssjay](https://github.com/ssssssjay)                 |                 [@evelo0702](https://github.com/evelo0702)                 |

<br/>

## 💁‍♂️ 핵심 기여사항

> 곽성재

- aladin API를 활용한 도서 검색 및 정보 조회 기능 구현
- kakao map API를 활용한 주변 도서 렌더링 기능 구현
- Vuex를 활용한 좋아요 기능 구현

> 노영석

- socket.io을 활용한 1:1 채팅기능 구현
- kakao login API와 Vuex를 활용한 로그인 기능 구현
- aws rds, s3를 활용한 db, 이미지 업로드 업로드 구현

<br/>

## 📱 기능 소개

> **알라딘 API를** 활용하여 책들의 정보를 알 수 있다.

- 원하는 키워드로 검색하여 특정 책의 정보를 조회할 수 있다.
- 각 분야별 현재 베스트셀러의 목록을 조회할 수 있다.
<div align="center">
<img width = 600, src="https://user-images.githubusercontent.com/89081441/218637802-ba5961c0-c601-4d3e-a259-d69058ea16b4.gif" style="margin-bottom:500px">
</div>

> 판매를 원하는 **중고도서를 등록** 할 수 있다.

- `mysql database`를 활용하여 중고도서를 등록할 수 있다.
- `multer`를 활용하여 이미지 업로드가 가능하다.
<div align="center">
<img width = 600, src="https://user-images.githubusercontent.com/89081441/218637807-2d2ffed6-5eb5-4796-9700-82047c8f6842.gif" >
</div>

> **원하는 책이나 중고책에 좋아요**를 누를 수 있다.

- `Vuex`를 활용하여 좋아요 기능을 이용할 수 있다.
- 로컬스토리지를 활용하여 페이지가 새로고침 되어도 상태를 유지한다.
<div align="center">
<img width = 600, src="https://user-images.githubusercontent.com/89081441/218637805-981ddf1e-6d1b-4cb5-8a0d-5d4cda7d4d70.gif" >
</div>

> **socket.io를 활용하여** 채팅이 가능하다.

- `socket.io`를 활용하여 원하는 중고도서의 판매자와 채팅이 가능하다.
<div align="center">
<img width = 600, src="https://user-images.githubusercontent.com/89081441/218637811-4c2048f2-647a-44f3-a08f-7f40649e03d3.gif" >
</div>

> **내 주변 중고도서들을** 지도에서 확인 가능하다.

- `geolocation`을 활용하여 내 주변의 중고도서를 확인 가능하다.
- `daumpostcode`를 활용하여 내 주변에 위치한 중고도서들만이 렌더링 된다.
<div align="center">
<img width = 600, src="">
</div>

> **카카오 로그인 API를** 활용하여 로그인이 가능하다.

- 카카오 로그인 API와 Vuex를 활용하여 로그인이 가능하다.
- 비로그인 유저에게는 좋아요나 등록 등의 기능이 불가능하며, 네비게이션 가드를 활용하여 페이지 접근이 불가하다.
<div align="center">
<img width = 600, src="https://user-images.githubusercontent.com/89081441/218637814-ad425bbc-1d9f-4baf-84a6-b905ff131ecc.gif" >
</div>

<br/>

</div>
