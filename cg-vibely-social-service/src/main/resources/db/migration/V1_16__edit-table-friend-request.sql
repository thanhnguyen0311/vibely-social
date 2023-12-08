use vibely_social_webapp;
drop index user_id on friend_request;
alter table friend_request
    add constraint unique (sender_id, receiver_id);

alter table friend
    add index (user_id, friend_id);