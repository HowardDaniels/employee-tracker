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

CREATE TABLE employee(
* **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

);