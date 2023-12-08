USE vibely_social_webapp;

CREATE TABLE IF NOT EXISTS feedItem
(
    id           bigint PRIMARY KEY AUTO_INCREMENT,
    user_id      bigint,
    privacy      varchar(20) CHECK ( privacy = 'public' OR privacy = 'friend' OR privacy = 'private'),
    text_content text,
    created_at   datetime,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE IF NOT EXISTS media
(
    id       bigint PRIMARY KEY AUTO_INCREMENT,
    user_id  bigint,
    post_id  bigint,
    filename varchar(255),
    type     varchar(32), #image/video
    created_at  datetime,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE IF NOT EXISTS comment
(
    post_id    bigint,
    user_id    bigint,
    content    text,
    media_file varchar(255),
    created_at datetime,
    PRIMARY KEY (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS reply_comment
(
    post_id          bigint,
    comment_owner_id bigint,
    content          text,
    media_file       varchar(255),
    created_at datetime,
    PRIMARY KEY (post_id, comment_owner_id)
);

CREATE TABLE IF NOT EXISTS posts_like
(
    post_id    bigint,
    user_id    bigint,
    created_at datetime,
    PRIMARY KEY (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS comments_like
(
    post_id          bigint,
    comment_owner_id bigint,
    created_at       datetime,
    PRIMARY KEY (post_id, comment_owner_id)
);