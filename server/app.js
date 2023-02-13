const express = require("express");
// const path = require("path");
const socketio = require("socket.io");
const session = require("express-session");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const now = new Date();
let messages = [];
require("dotenv").config({ path: `mysql/.env` });
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const mysql = require("./mysql");
const fs = require("fs");
app.use("/static/images", express.static("public/images"));
app.use(
  express.json({
    limit: "50mb", // 최대 50메가
  })
);

let sess = {
  secret: "secret key",
  resave: false, // 세션에 변경사항이 없어도 항상 다시 저장할지 여부
  saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 강제로 저장할지 여부
  cookie: {
    httpOnly: true, // document.cookie 해도 쿠키 정보를 볼 수 없음
    secure: false, // https
    maxAge: 1000 * 60 * 60, // 쿠키가 유지되는 시간
  },
  userId: "",
};
app.use(session(sess));
const corsOptions = {
  origin: "http://localhost:5173", // 허용할 도메인 설정
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// 이미지 업로드
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // 전송된 파일이 저장되는 디렉토리
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname)); // 시스템 시간으로 파일이름을 변경해서 저장
  },
});

// const imageUpload = multer({ storage: imageStorage });

const imageUpload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "usedbook0",
    acl: "public-read",
    key(req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.post("/api/upload/image", imageUpload.single("attachment"), (req, res) => {
  res.send(req.file);
});

app.get("/api/file/:filename", (req, res) => {
  const file = "./uploads/" + req.params.filename;
  try {
    if (fs.existsSync(file)) {
      res.download(file);
    } else {
      res.send("요청한 파일이 존재하지 않습니다.");
    }
  } catch (e) {
    console.log(e);
    res.send("파일을 다운로드 하는 중 에러가 발생했습니다.");
  }
});
const bookRoute = require("./routes/book");
const userRoute = require("./routes/user");
const libraryRoute = require("./routes/library");
const usedBookRoute = require("./routes/usedBook");
const chatRoute = require("./routes/chat");

app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/library", libraryRoute);
app.use("/used-book", usedBookRoute);
app.use("/chat", chatRoute);

// =======================채팅=================
const users = [];
// Join user to chat
function userJoin(id, user_id, user_nickname, room) {
  const user = { id, user_id, user_nickname, room };
  users.push(user);
  return user;
}

// get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

const moment = require("moment");

function formatMessage(user_id, user_nickname, msg, time, img) {
  return {
    sender_id: user_id,
    user_nickname,
    msg,
    time,
    user_image: img,
  };
}

const io = require("socket.io")(server, {
  pingTimeout: 1000,
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Helloooooo");
});
const id = [];
io.on("connection", (socket) => {
  socket.on("message22", (msg) => {
    let message = {
      message: msg.msg0,
      user_id: msg.user,
    };
    console.log("=============");
    console.log(message);

    console.log(msg);
    io.emit("msg22", msg);
  });
  // client로부터의 메시지가 수신되면
  socket.on("chat", (data) => {
    console.log(`Message from ${data.name}: ${data.msg}`);

    let msg = {
      from: {
        name: data.name,
        avatar: data.avatar,
      },
      msg: data.msg,
    };

    // 메시지를 전송한 client를 제외한 모든 client에게 메시지를 전송한다
    socket.broadcast.emit("chat", msg);
  });
  // room 입장
  let user = [];
  socket.on("joinRoom", ({ user_id, user_nickname, chat_id, prev }) => {
    user = [];
    user = userJoin(socket.id, user_id, user_nickname, chat_id);
    let prevRoom = prev;

    socket.leave(prevRoom);
    socket.join(user.room);

    console.log(`hello ${user.room}`);
  });
  socket.on("autoJoin", (user_id, user_nickname, room) => {
    user = [];
    user = userJoin(socket.id, user_id, user_nickname, room);

    socket.join(user.room);
    console.log(`autoJoin ${user.room}`);
  });
  socket.on("chatMsg", async (msg, time, img) => {
    // const user = getCurrentUser(socket.id);

    io.to(user.room).emit(
      "msg3",
      formatMessage(user.user_id, user.user_nickname, msg, time, img)
    );
  });
  socket.on("leaveRoom", (room_id) => {
    socket.leave(room_id);
    console.log(`leave ${room_id}`);
  });
  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.name}`);
  });
});

server.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작되었습니다.");
});
