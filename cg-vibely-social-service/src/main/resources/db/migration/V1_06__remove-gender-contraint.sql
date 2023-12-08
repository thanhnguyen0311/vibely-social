use vibely_social_webapp;
alter table user drop constraint user_chk_1;
alter table user modify column gender varchar(20);