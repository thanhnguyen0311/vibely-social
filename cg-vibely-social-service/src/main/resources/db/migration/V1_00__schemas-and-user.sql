CREATE DATABASE IF NOT EXISTS vibely_social_webapp;
USE vibely_social_webapp;

CREATE TABLE IF NOT EXISTS user
(
    id           bigint PRIMARY KEY AUTO_INCREMENT,
    email        varchar(255) UNIQUE NOT NULL,
    password     varchar(255)        NOT NULL,
    first_name   varchar(50)         NOT NULL,
    last_name    varchar(50)         NOT NULL,
    gender       varchar(10) CHECK ( gender = 'male' OR gender = 'female' OR gender = 'optional'),
    day_of_birth date,
    created_at   datetime
);

CREATE TABLE IF NOT EXISTS user_detail
(
    id           bigint PRIMARY KEY AUTO_INCREMENT,
    user_id      bigint,
    phone_number varchar(12),
    city         varchar(255),
    relationship varchar(255)
);

CREATE TABLE IF NOT EXISTS role
(
    id        bigint PRIMARY KEY AUTO_INCREMENT,
    role_name varchar(20)
);

CREATE TABLE IF NOT EXISTS user_role
(
    id      bigint PRIMARY KEY AUTO_INCREMENT,
    user_id bigint,
    role_id bigint,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
);

CREATE TABLE IF NOT EXISTS friend
(
    id        bigint PRIMARY KEY AUTO_INCREMENT,
    user_id   bigint,
    friend_id bigint
);

CREATE TABLE IF NOT EXISTS friend_request
(
    id        bigint PRIMARY KEY AUTO_INCREMENT,
    user_id   bigint,
    friend_id bigint,
    status    varchar(50) CHECK ( status = 'pending' OR status = 'accepted' OR status = 'canceled'),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

# used to decide which friends' posts should be shown in newsfeed
CREATE TABLE IF NOT EXISTS following
(
    id               bigint PRIMARY KEY AUTO_INCREMENT,
    user_id          bigint,
    followed_user_id bigint,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

DROP TABLE user_detail;
ALTER TABLE user
    ADD COLUMN (phone_number varchar(12),
                city varchar(255),
                relationship varchar(255));