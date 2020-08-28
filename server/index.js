const express = require("express");
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("express");
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
    io.to(`${pin}`).emit("room-pin", `${pin}`);
    addRoom(socket.id, pin);
  });

  socket.on("guest-join-session", (id, pin) => {
    //validate pin --start session
    console.log("recieved", id, pin);
  });

  socket.on("question-sent", (data) => {
    //submit comment -- later add a time check since last
    //comment as well as high upvotes -> extra rights
    console.log(data.user);
    const newQuestion = addQuestion(data.room, data.question, data.user);
    io.to(`${data.room}`).emit("new-question", newQuestion);
  });
});

//SOCKET OUTPUT PROCEDURES

const emitPermissionGranted = (roomID) => {};

//GENERAL PROCEDURES

//POST

const addRoom = async (id, pin) => {
  try {
    if (id === undefined) return;

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

const addUser = async (roomPin, userSocket, host) => {
  try {
    const body = { roomPin, userSocket, host };
    await fetch(`${ip}${port}/active_users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(err.message);
  }
};

const addQuestion = (room, question, user) => {
  try {
    const body = { room, question, user };
    const newQuestion = fetch(`${ip}${port}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const stringData = JSON.stringify(newQuestion);
    return stringData;
  } catch (err) {
    console.error("add room error", err.message);
  }
};

// GET
const getAllQuestions = (pin) => {
  try {
    const params = { pin };
    fetch(`${ip}${port}/questions/${pin}`);
  } catch (err) {
    console.error(err.message);
  }
};

/* The following procedures are routes to the DB with accompanying actions  */

//POST
app.post(`/rooms`, async (req, res) => {
  try {
    const { pin, id } = req.body;
    const newSerial = await pool.query(
      "INSERT INTO rooms (room_id, host_socket) VALUES($1, $2);",
      [pin, id]
    );
    addUser(pin, id, true);
  } catch (err) {
    console.error(err.message);
  }
});

app.post(`/active_users`, async (req, res) => {
  try {
    const { roomPin, userSocket, host } = req.body;
    const newUser = await pool.query(
      "INSERT INTO active_users (user_room_pin, user_socket, host) VALUES($1, $2, $3);",
      [roomPin, userSocket, host]
    );
    console.log("user added: id= ", userSocket, " room= ", roomPin);
  } catch (err) {
    console.error(err.message);
  }
});

// returnere hvert spørsmål direkte tilbake til klientene i rommet, eller returnere den oppdaterte listen? Samme gjelder upvotes

app.post("/questions", async (req, res) => {
  try {
    const { room, question, user } = req.body;
    const newQuestion = await pool.query(
      "INSERT INTO questions (question_room_pin, question, user_asked) VALUES ($1, $2, $3) returning *",
      [room, question, user]
    );
    console.log("question submitted at: ", newQuestion.rows[0]["submit_time"]);
    res.json(newQuestion);
  } catch (err) {
    console.error(err.message);
  }
});

//GET

//get all questions submitted in a specific room
app.get("/questions/:pin", async (req, res) => {
  try {
    const { pin } = req.params;
    const allQuestions = await pool.query(
      "SELECT * from questions where question_room_pin = $1;",
      [pin]
    );
    res.json(allQuestions);
  } catch (err) {
    console.error(err.message);
  }
});
