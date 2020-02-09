CREATE DATABASE HR_APP;

CONNECT HR_APP;

CREATE TABLE employee (id INT AUTO_INCREMENT,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	username VARCHAR(30),
	pw VARCHAR(30),
	role VARCHAR(100),
	salary INT,
	vacation_balance INT,
	annual_bonus INT,
	# manager
	manager_id INT,
	PRIMARY KEY(id));

CREATE TABLE hr_employee (id INT,
	CONSTRAINT fk_hr_employee FOREIGN KEY (id) REFERENCES employee(id));

CREATE TABLE admin (id INT,
	CONSTRAIN fk_admin FOREIGN KEY (id) REFERENCES employee(id));