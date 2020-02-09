CREATE DATABASE HR_APP;

CONNECT HR_APP;

CREATE TABLE employee (id INT AUTO_INCREMENT,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	username VARCHAR(30),
	pw VARCHAR(30),
	position VARCHAR(100),
	salary INT,
	vacation_balance INT,
	annual_bonus INT,
	# manager
	manager_id INT,
	PRIMARY KEY(id));

CREATE TABLE hr_employee (id INT,
	CONSTRAINT fk_hr_employee FOREIGN KEY (id) REFERENCES employee(id));

CREATE TABLE admin (id INT,
	CONSTRAINT fk_admin FOREIGN KEY (id) REFERENCES employee(id));

INSERT INTO employee (first_name, last_name, username, pw, position, salary, vacation_balance, annual_bonus, manager_id) VALUES
	('Justin', 'Lee', 'justinlee', 'notsecure', 'Head Admin', 10000000, 365, 999999, 1);