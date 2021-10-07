const express = require("express");
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("express");
const http = require("http").Server(app);
app.use(cors());

/* allow cross origin resource sharing from same IP
  with port 3000 (react frontend)
  */
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:3000"],
  },
});
app.use(express.json());

const port = 6800;
const ip = "http://localhost:";

/* SOCKET EVENTS

The following methods are executed following an event on the socket */

io.on("connection", (socket) => {
  console.log("user joined", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    //TODO: delete the user from DB
  });

  /* generate random room pin code that guests can connect to */
  socket.on("host-start-session", () => {
    const pin = Math.floor(Math.random() * 90000) + 10000;
    //should query DB in order to check for duplicates and generate new pin

    socket.join(`${pin}`);
    io.to(`${socket.id}`).emit("room-pin", `${pin}`);
    addRoom(socket.id, pin);
  });

  /* fires when a participant tries to enter a room with a provided pin */
  socket.on("guest-join-session", (id, pin) => {
    console.log("recieved", id, pin);

    socket.join(`${pin}`); //add the socket to the hosts room
    addUser(pin, id, false); //add user entry into database
    io.to(`${id}`).emit("room-access", pin);
    getAllQuestions(pin); //query all existing questions and present to new user
    participants = io.sockets.adapter.rooms[`${pin}`].length - 1; //find participant count
    io.to(`${pin}`).emit("viewercount-change", participants); //broadcast the new number of participants
  });

  /* add a new question to the database */
  socket.on("question-sent", (data) => {
    console.log(data.user);
    addQuestion(data.room, data.question, data.user);
  });

  /* increment the upvote count for the provided question */
  socket.on("upvote-sent", (question) => {
    upvoteQuestion(question.question_room_pin, question.question_serial);
  });

  /* fires when the host initiates a question round - not yet implemented in frontend */
  socket.on("votinground-sent", (info) => {
    console.log(info.question);
    io.to(`${info.room}`).emit("start-votinground", info.question);
  });
});

/*
The following procedues send qeueries to the DB  
*/

//adds a new room to the DB using the generated pin as the room ID

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

//adds a new user to the DB using the socket ID as identifier

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

/* TODO: this method should delete a user from the DB */
const removeUser = (roomPin, userSocket, host) => {};

/* TODO: this method should delete a question from the session */
const removeQuestion = (roomPin, question) => {};

//adds a new question to the DB with the corresponding room and user ID

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

//requests all questions registered to a room with the given pin

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

/* TODO: check for existence of room pin before participant 
   connects to avoid 'ghost rooms'
*/
const checkRoomExists = (pin) => {};

//updates a question in the DB by incrementing the vote count

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



/* 
The following procedures answer the socket event procedures
above by querying the database for the requested resources
*/

app.post(`/rooms`, async (req) => {
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

//adds a new user to DB with accompanying room ID

app.post(`/active_users`, async (req) => {
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

//post a question to the correspinding room in the DB

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
  } catch (err) {
    console.error(err.message);
  }
});

//Registers an upvote to a question in the DB

app.put("/questions/:pin/:serial", async (req, res) => {
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
