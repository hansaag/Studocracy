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

  //socket.removeAllListeners(room + '-newMessage'); til en metode

  //socket.off('MY_EVENT').on('MY_EVENT', () => doThisOnlyOnce());
  socket.on("host-start-session", () => {
    console.log("host starting session");
    //validate pin --start session (socket.data = data f.eks)
    const pin = Math.floor(Math.random() * 90000) + 10000;

    socket.join(`${pin}`);
    io.send(`${socket.id}`).emit("room-pin", `${pin}`);
    addRoom(socket.id, pin);
  });

  socket.on("guest-join-session", (id, pin) => {
    //validate pin --start session
    console.log("recieved", id, pin);
    socket.join(`${pin}`);

    addUser(pin, id, false);
    io.send(`${id}`).emit("room-access", pin);
  });

  socket.on("question-sent", (data) => {
    //submit comment -- later add a time check since last
    //comment as well as high upvotes -> extra rights
    console.log(data.user);
    addQuestion(data.room, data.question, data.user);
  });
});

//SOCKET OUTPUT PROCEDURES

const emitPermissionGranted = (roomID) => {};

//GENERAL PROCEDURES

//POST

const addRoom = async (id, pin) => {
  if (id === undefined) return;
  try {
    const body = { pin, id };
    await fetch(`${ip}${port}/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error); //more compact try/catch syntax
  }
};

const addUser = (roomPin, userSocket, host) => {
  try {
    const body = { roomPin, userSocket, host };
    fetch(`${ip}${port}/active_users`, {
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
    fetch(`${ip}${port}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(() => {
      getAllQuestions(room);
    });
  } catch (err) {
    console.error("add room error", err.message);
  }
};

// GET
const getAllQuestions = (pin) => {
  try {
    fetch(`${ip}${port}/questions/${pin}`).then((questions) => {
      console.log("log from get method calling the route: ", questions);
    });
  } catch (err) {
    console.error(err.message);
  }
};

/* The following procedures are routes to the DB with accompanying actions  */

//POST
app.post(`/rooms`, async (req, res) => {
  try {
    const { pin, id } = req.body;
    await pool.query(
      "INSERT INTO rooms (room_id, host_socket) VALUES($1, $2);",
      [pin, id]
    );
    console.log("room added: ", pin);
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
    console.log("question submitted at: ", newQuestion.rows[0]["question"]);
    res.json(newQuestion.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//GET

//get all questions submitted in a specific room
app.get("/questions/:pin", (req) => {
  try {
    const { pin } = req.params;
    pool
      .query(
        "SELECT * from questions where question_room_pin = $1 ORDER BY submit_time desc;",
        [pin]
      )
      .then((questions) =>
        io.to(`${pin}`).emit("update-questions", questions.rows)
      );

    // res.json(allQuestions.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
