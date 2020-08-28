CREATE TABLE rooms(
    room_id INT PRIMARY KEY,
    active boolean NOT NULL default true,
    initiated DATE default CURRENT_DATE,
    host_socket varchar(25);
);

CREATE TABLE active_users(
    user_room_pin INT NOT NULL references rooms(room_id),
    user_socket varchar(25) PRIMARY KEY,
    host BOOLEAN NOT NULL default false
);

CREATE TABLE questions(
    question_serial SERIAL PRIMARY KEY,
    question_room_pin INT NOT NULL references rooms(room_id),
    question VARCHAR NOT NULL,
    upvotes INT default 0,
    user_asked varchar(25) references active_users(user_socket),
    submit_time DATE DEFAULT CURRENT_DATE
);
-- SELECT TO_CHAR(NOW() :: DATE, 'dd/mm/yyyy');


ALTER SEQUENCE rooms_serial_nr_seq RESTART WITH 1;