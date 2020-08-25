CREATE TABLE rooms(
    room_id INT PRIMARY KEY,
    active boolean NOT NULL default false,
    initiated DATE default CURRENT_DATE
);

CREATE TABLE active_users(
    user_room_id INT NOT NULL references rooms(room_id),
    user_socket varchar(25) PRIMARY KEY,
    host BOOLEAN NOT NULL default false
);

CREATE TABLE questions(
    question_room_id INT NOt NULL references rooms(room_id),
    question VARCHAR NOT NULL,
    upvotes INT default 0,
    user_asked varchar(25) references active_users(user_socket)
);