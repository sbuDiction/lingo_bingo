create table users (
    id serial primary key,
    firstname text,
    lastname text,
    username text,
    email text
);

create table scores (
    id serial primary key,
    score BIGINT,
    users_id integer references users (id) on delete cascade on update cascade
);
