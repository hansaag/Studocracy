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

//SOCKET EVENTS

io.on("connection", (socket) => {
  console.log("user joined", socket.id);

  socket.on("disconnect", () => {
    console.log("host disconnected");
    //logic handle failed DB calls
  });

  socket.on("host-start-session", () => {
    const pin = Math.floor(Math.random() * 90000) + 10000;
    //needs to check DB for existing value

    socket.join(`${pin}`);
    io.to(`${socket.id}`).emit("room-pin", `${pin}`);
    addRoom(socket.id, pin);
  });

  socket.on("guest-join-session", (id, pin) => {
    //validate pin --start session
    console.log("recieved", id, pin);
    socket.join(`${pin}`);

    addUser(pin, id, false);
    io.to(`${id}`).emit("room-access", pin);
    getAllQuestions(pin);
    participants = io.sockets.adapter.rooms[`${pin}`].length - 1;
    io.to(`${pin}`).emit("viewercount-change", participants);
  });

  socket.on("question-sent", (data) => {
    //submit comment -- later add a time check since last
    //comment as well as high upvotes -> extra rights
    console.log(data.user);
    addQuestion(data.room, data.question, data.user);
  });

  socket.on("upvote-sent", (question) => {
    upvoteQuestion(question.question_room_pin, question.question_serial);
  });

  socket.on("votinground-sent", (info) => {
    console.log(info.question);
    io.to(`${info.room}`).emit("start-votinground", info.question);
  });
});

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
  console.log("adding question");
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
  console.log("get all questions method called");
  try {
    fetch(`${ip}${port}/questions/${pin}`).then((questions) => {
      console.log("log from get method calling the route: ", questions);
    });
  } catch (err) {
    console.error(err.message);
  }
};

// PUT
const upvoteQuestion = (pin, serial) => {
  try {
    fetch(`${ip}${port}/questions/${pin}/${serial}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      getAllQuestions(pin);
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
    await pool.query(
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
        "SELECT * from questions where question_room_pin = $1 ORDER BY question_serial desc;",
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

// PUT
app.put("/questions/:pin/:serial", async (req, res) => {
  console.log("route to add upvote called");
  try {
    const { pin, serial } = req.params;
    console.log(pin, serial);
    const upvoted = await pool.query(
      "UPDATE questions SET upvotes = upvotes + 1 WHERE question_room_pin = $1 and question_serial = $2;",
      [pin, serial]
    );
    console.log(upvoted.rows);
    res.json(upvoted.rows);
  } catch (err) {
    console.error(err.message);
  }
});

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
