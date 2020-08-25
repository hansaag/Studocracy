const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http);
app.use(cors());

const port = 6800;

const rooms = Array();

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});

io.on("connection", (socket) => {
  console.log("user joined");

  socket.on("host-join-lobby", (data) => {
    //show optionsl
  });

  socket.on("host-join-session", (data) => {
    //validate pin --start session
  });

  socket.on("guest-join-session", (data) => {
    //
  });
});
