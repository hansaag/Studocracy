CREATE TABLE rooms(
    serial_nr SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    active boolean NOT NULL default true,
    initiated DATE default CURRENT_DATE
);

CREATE TABLE active_users(
    user_room_serial INT NOT NULL references rooms(serial_nr),
    user_socket varchar(25) PRIMARY KEY,
    host BOOLEAN NOT NULL default false
);

CREATE TABLE questions(
    question_room_serial INT NOt NULL references rooms(serial_nr),
    question VARCHAR NOT NULL,
    upvotes INT default 0,
    user_asked varchar(25) references active_users(user_socket)
);