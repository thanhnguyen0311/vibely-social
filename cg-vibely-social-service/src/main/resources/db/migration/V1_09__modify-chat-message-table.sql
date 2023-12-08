use vibely_social_webapp;

drop table if exists chat_message;
create table chat_message
(
    id             bigint primary key auto_increment,
    sender_email   varchar(255),
    receiver_email varchar(255),
    sender_name    varchar(50),
    content        text,
    time           datetime,
    index (sender_email, receiver_email)
);

alter table user
    add column status bit;