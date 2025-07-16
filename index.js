const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend dev server
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
//   console.log("✅ New user connected:", socket.id);

 socket.on("send_message", ({ name, text }) => {
  io.emit("receive_message", { name, text });
});

  socket.on("disconnect", () => {
    // console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
