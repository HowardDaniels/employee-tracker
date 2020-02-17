INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("HR");
INSERT INTO department (name) VALUES ("IT");
INSERT INTO department (name) VALUES ("Sales");
 
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 75000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Recruiter", 60000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Developer", 80000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Agent", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Joe", "Smith", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Steven", "Peterson", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Anne", "Richardson", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Elizabeth", "Scott", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Diego", "Sanchez", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rhonda", "Stuart", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Louisa", "Li", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andrew", "Carter", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Karen", "Williams", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sven", "Schmidt", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Courtney", "Leroy", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Arthur", "Cho", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pamela", "Willis", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Donna", "Hernandez", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Henry", "Matthews", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Joao", "dos Santos", 4, 4);