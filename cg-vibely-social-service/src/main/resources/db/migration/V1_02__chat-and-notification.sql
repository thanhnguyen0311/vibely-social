USE vibely_social_webapp;

CREATE TABLE IF NOT EXISTS chat_message
(
    sender_id   bigint,
    receiver_id bigint,
    content     text,
    created_at  datetime,
    PRIMARY KEY (sender_id, receiver_id)
);


CREATE TABLE IF NOT EXISTS notification
(
    id         binary(16) PRIMARY KEY NOT NULL, #UUID
    user_id    bigint,
    content    text,
    marked     bit,                             #notify marked as read
    created_at datetime
);
#EXPLAIN SELECT * FROM notification WHERE id = 0xEFBBBF76723978000000000000000000;
# EXPLAIN SELECT * FROM chat_message WHERE (sender_id = 1 AND receiver_id = 2);