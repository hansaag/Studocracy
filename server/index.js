const express = require("express");
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");
const pool = require("./db");
const http = require("http").Server(app);
const io = require("socket.io")(http);
app.use(cors());
app.use(express.json());

const port = 6800;
const ip = "http://localhost:";

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});

/* CLIENT SIDE PROCEDURES (ABSTRACT)

1) connect
2) host disconnect
3) guest disconnect
4) host started session 
5) guest join session 
6) comment submit
7) upvote 
*/

//SOCKET INPUT PROCEDURES

io.on("connection", (socket) => {
  console.log("user joined", socket.id);

  socket.on("host-disconnect", () => {
    console.log("host disconnected");
  });

  socket.on("guest-disconnect", () => {
    console.log("guest disconnected");
  });

  socket.on("host-start-session", (id) => {
    console.log("host starting session");
    //validate pin --start session (socket.data = data f.eks)
    const pin = Math.floor(Math.random() * 90000) + 10000;
    console.log(pin);
    socket.join(`${pin}`);

    addRoom(socket, pin);
  });

  socket.on("guest-join-session", (id, pin) => {
    //validate pin --start session
    console.log("recieved", id, pin);
  });

  socket.on("question-sent", (data) => {
    //submit comment -- later add a time check since last
    //comment as well as high upvotes -> extra rights
    console.log(data);
  });
});

//SOCKET OUTPUT PROCEDURES

const emitPermissionGranted = (roomID) => {};

//GENERAL PROCEDURES

const addRoom = async (socket, pin) => {
  try {
    if (socket === undefined) return;

    id = socket["id"];

    const body = { pin, id };
    await fetch(`${ip}${port}/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("add room error", err.message);
  }
};

//DATABASE PROCEDURES
app.post(`/rooms`, async (req, res) => {
  try {
    const { pin, id } = req.body;
    const newSerial = await pool.query(
      "INSERT INTO rooms (room_id, host_socket) VALUES($1, $2) returning serial_nr;",
      [pin, id]
    );
    io.to(`${pin}`).emit(
      "room-pin",
      `${pin}`,
      `${newSerial.rows[0]["serial_nr"]}`
    );
  } catch (err) {
    console.error(err.message);
  }
});
