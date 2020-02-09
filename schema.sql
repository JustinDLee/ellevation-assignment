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

CREATE TABLE salary_history (employee_id INT, amount INT, effective_date DATETIME, 
	CONSTRAINT fk_salary_history FOREIGN KEY (employee_id) REFERENCES employee(id));

INSERT INTO employee (first_name, last_name, username, pw, position, salary, vacation_balance, annual_bonus, manager_id) VALUES
	('Justin', 'Lee', 'justinlee', 'notsecure', 'Head Admin', 10000000, 365, 999999, 1),
    ('John', 'Smith', 'johnsmith', 'johnsmith', 'CEO', 300000, 30, 10000, 2),
    ('Richard', 'Hendrinks', 'richardhendricks', 'password', 'Software Engineer', 100000, 20, 2000, 2),
    ('Jared', 'Dunn', 'jareddunn', 'donald', 'Head of HR', 60000, 15, 0, 2),
    ('Timmy', 'Turner', 'timmyturner', 'wandacosmo', 'HR Intern', 0, 0, 0, 4);

INSERT INTO admin(id) VALUES
	(1);
INSERT INTO hr_employee VALUES 
	(4),
	(5);

INSERT INTO salary_history (employee_id, amount, effective_date) VALUES 
	(1, 10000000, '2020-02-02'),
	(1, 100000, '2020-02-01'),
	(1, 0, '2020-01-01')