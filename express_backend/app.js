import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const PORT = 3003;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("message", (data) => {
    console.log(data);
    // socket.broadcast.emit("broadcast", data);
    io.emit("broadcast", data);
  });
});

server.listen(PORT, () => {
  console.log("sever is running on port " + PORT);
});
