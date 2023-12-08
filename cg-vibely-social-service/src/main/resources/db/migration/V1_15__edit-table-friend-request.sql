use vibely_social_webapp;
alter table friend_request
drop constraint friend_request_ibfk_1;

alter table friend_request rename column user_id to sender_id;
alter table friend_request rename column friend_id to receiver_id;
alter table friend_request drop column status;