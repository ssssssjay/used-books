const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
require("dotenv").config({ path: `mysql/.env` });
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const mysql = require("./mysql");
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
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // 전송된 파일이 저장되는 디렉토리
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname)); // 시스템 시간으로 파일이름을 변경해서 저장
  },
});

const imageUpload = multer({ storage: imageStorage });

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

app.post(
  "/api/upload/image",
  imageUpload.single("attachment"),
  async (req, res) => {
    const fileInfo = {
      product_id: parseInt(req.body.product_id),
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      filename: req.file.filename,
      path: req.file.path,
    };

    res.send(fileInfo);
  }
);

const bookRoute = require("./routes/book");
const userRoute = require("./routes/user");
const libraryRoute = require("./routes/library");
const usedBookRoute = require("./routes/usedBook");

app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/library", libraryRoute);
app.use("/used-book", usedBookRoute);

// =======================채팅=================
const io = require("socket.io")(server, {
  pingTimeout: 1000,
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Helloooooo");
});

io.on("connection", (socket) => {
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

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.name}`);
  });
});

server.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작되었습니다.");
});
