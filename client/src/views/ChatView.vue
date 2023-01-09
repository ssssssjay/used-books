<template>
  <hr />

  msgData : {{ msgData }}
  <hr />
  user :{{ user }}
  <hr />
  currentRoom: {{ currentRoom }} prevRoom: {{ prevRoom }}
  <hr />
  {{ user.user_nickname }}
  <div>
    <div class="container">
      <div class="content-box">
        <div class="aside">
          <ul
            v-for="room in roomList"
            :key="room.roomId"
            class="room-list"
            :class="{ current: currentRoom == room.roomId }"
            @click="
              changeRoom(
                user.user_id,
                user.user_nickname,
                room.roomId,
                prevRoom
              )
            ">
            <img :src="room.senderImage" alt="" class="room-img ms-2" />

            <li class="room-name ms-2">
              {{ room.senderNickname }}
            </li>
          </ul>
        </div>
        <div class="main" ref="chatArea">
          <div class="msg" ref="refscrollHeight">
            <div class="chat-messages" v-for="(msg, i) in msgData" :key="i">
              <div class="message-me" v-show="msg.user_id === user.user_id">
                <img src="" alt="" />
                <p class="meta me-2">{{ msg.user_nickname }} <span></span></p>
                <p class="text">{{ msg.msg }}</p>
                <p class="text">{{ msg.time }}</p>
              </div>
              <div class="message-other" v-show="msg.user_id != user.user_id">
                <p class="text">{{ msg.time }}</p>
                <p class="text">{{ msg.msg }}</p>

                <p class="meta me-2">{{ msg.user_nickname }} <span></span></p>
              </div>
            </div>
          </div>

          <form class="input-form" @submit.prevent="sendMsg(this.newMsg)">
            <!-- sendMsg(this.user.user_id, this.newMsg),  -->
            <input
              class="input-msg"
              type="text"
              placeholder="Enter Message"
              v-model="newMsg"
              autocomplete="off" />
            <button class="btn"><i class="fas fa-paper-plane"></i> Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
import { ref, nextTick, onUpdated } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const socket = io("http://localhost:3000");

export default {
  emits: ["update:message"],
  components: {},
  data() {
    return {
      prevRoom: 0,
      chatId: "",
      newMsg: "",
      roomList: [
        {
          roomId: 4728,
          receiverId: 28,
          senderId: 47,
          senderNickname: "곽성재",
          senderImage:
            "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
        },
        {
          roomId: 15,
          receiverId: 28,
          senderId: 47,
          senderNickname: "노영석",
          senderImage:
            "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
        },
      ],
    };
  },
  setup() {
    const store = useStore();
    let user = store.state.userInfo;
    let chatArea = ref(null);
    let refscrollHeight = ref(null);
    let currentRoom = ref(0);
    const update = () => {
      nextTick(() => {
        chatArea.value.scrollTo({
          behavior: "smooth",
          top: refscrollHeight.value.clientHeight,
        });
      });
    };
    onUpdated(update);
    const route = useRoute();
    console.log(currentRoom);

    currentRoom.value = Number(route.query.id);

    const msgData = ref([]);
    socket.on("msg3", (data) => {
      console.log(data);
      msgData.value.push(data);
    });
    // socket.emit("autoJoin", currentRoom.value);
    return {
      msgData,
      update,
      chatArea,
      refscrollHeight,
      currentRoom,
      user,
    };
  },
  created() {},
  mounted() {
    if (isNaN(this.currentRoom)) {
      this.currentRoom = this.roomList[0].roomId;
      this.prevRoom = this.currentRoom;
    }
    socket.emit(
      "autoJoin",
      this.user.user_id,
      this.user.user_nickname,
      this.currentRoom
    );
  },
  unmounted() {
    socket.emit("leaveRoom", this.currentRoom);
  },
  updated() {},
  // computed: {
  //   userInfo() {
  //     return this.$store.state.userInfo;
  //   },
  // },
  // watch: {
  //   currentRoom() {
  //     socket.emit("leaveRoom")
  //   },
  // },
  methods: {
    changeRoom(user_id, user_nickname, room_id, prev) {
      // socket.emit("leaveRoom", this.currentRoom);
      this.msgData = [];
      this.prevRoom = this.currentRoom;
      if (this.currentRoom !== room_id) {
        console.log(`changeRoom ${user_id} // ${room_id}`);

        this.$router.push({
          query: {
            id: room_id,
          },
        });
        console.log("========");
        console.log(prev);
        this.currentRoom = room_id;
        socket.emit("joinRoom", { user_id, user_nickname, room_id, prev });

        // console.log(`currentRoom ${this.currentRoom}`);
      }
    },
    sendMsg(msg) {
      if (this.currentRoom != 0) {
        socket.emit("chatMsg", msg);
        this.newMsg = "";
      }
    },
  },
};
</script>

<style scoped>
.content-box {
  margin-top: 20px;
  width: 1300px;
  height: 90vh;
  display: grid;
  grid-template-columns: 2fr 10fr;
  grid-template-areas: "aside main";
  gap: 5px;
}
.aside {
  grid-area: aside;
  border: 1px solid black;
  border-radius: 4px;
}
.room-list {
  margin-bottom: 30px;
  display: flex;
}
.room-list.current {
  border: 4px solid #e6e9ff;
  background: #e6e9ff;
  border-radius: 4px;
}
.room-list:first-child {
  margin-top: 20px;
}
.room-img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.room-name {
  display: flex;
  align-items: center;
}
.main {
  grid-area: main;
  border: 1px solid black;
  border-radius: 4px;
  height: 100%;
}
.msg {
  height: 80vh;
  border-bottom: 1px solid black;
  overflow: auto;
}
.input-form {
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;
}
.input-msg {
  width: 80%;
}

.chat-messages {
  padding: 10px;
}

.chat-messages .message-me,
.message-other {
  padding: 10px;
  margin-bottom: 5px;
  background-color: #e6e9ff;
  border-radius: 5px;
  display: flex;
}
.message-me {
  flex-direction: row;
}
.message-other {
  flex-direction: row-reverse;
}
.chat-messages .message .meta {
  font-size: 15px;
  font-weight: bold;
  color: #7386ff;
  opacity: 0.7;
  margin-bottom: 7px;
}

.chat-messages .message .meta span {
  color: #777;
}
</style>
