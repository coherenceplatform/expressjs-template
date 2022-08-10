-- create database --
-- create database test;
 
-- create table --
create table users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    gender VARCHAR(100),
    phone VARCHAR(100)
);
 
-- insert data into table --
insert into users (first_name, last_name, email, gender, phone) values ('John', 'Doe', 'jdoe@nodomain.com', 'F', '555-111-1234');
 
-- view data --
select * from users;
