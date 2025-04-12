import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";

const wsServer = createServer();

console.log(config.get("frontend.admin_url"));

const io = new Server(wsServer, {
  cors: {
    // Todo : move origin value to config
    origin: config.get("frontend.admin_url"),
  },
});

io.on("connection", (socket) => {
  console.log("a new client connected", socket.id);

  socket.on("join", (data) => {
    socket.join(String(data.tenantId));
    // sending event from server to client
    socket.emit("join", { roomId: String(data.tenantId) });
  });
});

export default {
  wsServer,
  io,
};
