use vibely_social_webapp;

CREATE TABLE IF NOT EXISTS feed
(
    id           bigint PRIMARY KEY AUTO_INCREMENT,
    feed_items   json not null
);

ALTER TABLE user
    ADD avatar varchar(255);