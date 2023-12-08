use vibely_social_webapp;

drop table if exists notification;

CREATE TABLE IF NOT EXISTS notification
(
    id         bigint primary key auto_increment,
    type       varchar(255),
    user_id    bigint,
    from_user  bigint,
    content    text,
    seen       bit, #notify marked as read
    created_at datetime
);