import Koa from "koa";
import cors from "@koa/cors";
import KoaJson from "koa-json";
import historyApiFallback from "koa2-history-api-fallback";
import bodyparser from "koa-bodyparser";

import { createServer } from "http";
import { Server } from "socket.io";

import { combinedRoutes } from "./routes.js";

const PORT = 3003;

const app = new Koa();

// Enable CORS
app.use(cors());

// Prettyfy Json Response
app.use(KoaJson());

// Body parser
app.use(bodyparser());

// routes
app.use(combinedRoutes());

// ** This needs to be called after routes **
// base 'connect-history-api-fallback' for SPA
// https://github.com/luzuoquan/koa2-history-api-fallback
// https://github.com/bripkens/connect-history-api-fallback#readme
app.use(historyApiFallback());

// app.use(async (ctx) => (ctx.body = {"hello":"world"}));

const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
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

httpServer.listen(PORT, () => {
  console.log(`Server Started on port: ${PORT}`);
});
