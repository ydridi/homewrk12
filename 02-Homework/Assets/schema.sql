DROP DATABASE IF EXISTS Employee_Tracker;

CREATE DATABASE Employee_Tracker;

USE Employee_Tracker;

CREATE TABLE department(
id integer auto_increment not null,
name varchar(30) not null,
primary key(id)
);

CREATE TABLE role(
id integer auto_increment not null,
title varchar(30) not null,
salary decimal not null,
department_id Integer not null,
constraint fk_department_id foreign key (department_id) references department(id),
primary key(id)
);


CREATE TABLE employee(
id integer auto_increment not null,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id integer not null,
constraint fk_role_id FOREIGN KEY (role_id) REFERENCES role(id),
manager_id integer ,
constraint fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id),
Primary key(id)
);


INSERT into department (name)
VALUES ("Marketing");
INSERT into department (name)
VALUES ("R&D");

INSERT into role (title, salary, department_id)
VALUES ("Marketing Lead", 80000, 1);

INSERT into role (title, salary, department_id)
VALUES ("Product manager", 70000, 1);

INSERT into role (title, salary, department_id)
VALUES ("Software Engineer", 70000, 2);

INSERT into role (title, salary, department_id)
VALUES ("Firmware Engineer", 70000, 2);

INSERT into role (title, salary, department_id)
VALUES ("R&D Director", 170000, 2);



INSERT into employee (first_name, last_name, role_id)
values ("Yassine", "Dridi", 3); 