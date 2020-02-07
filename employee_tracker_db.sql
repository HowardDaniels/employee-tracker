-- DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
id INT,
department VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role(
id INT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY (id)
);