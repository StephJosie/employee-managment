
USE employee_db;

INSERT INTO department
(name)

VALUES 
        ("Engineering"),
        ("HR"),
        ("Legal"),
        ("Finance"),
        ("Sales");

INSERT INTO role
(title, salary, department_id)
VALUES  
        ("Senior Engineer", 90000, 1),
        ("HR Partner", 75000, 2),
        ("Junior Analyst", 70000, 3),
        ("FP&A Manager", 100000, 4),
        ("Sales Associate", 65000, 5);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
VALUES  
        ("Bo", "Bax", 1, 5),
        ("Luda", "Vico", 2, 1),
        ("Alec", "Aiden", 3. 2),
        ("Tesla", "Rosalind", 4, 3),
        ("Linus", "Apo", 5, 4);
        
Select
  employee.first_name,
  employee.last_name,
  roles.title,
  roles.salary,
  department.department_name,
  employee_m.first_name as manager_firstname,
  employee_m.last_name as manager_lastname
from
  employee
  join roles on employee.role_id = roles.id
  join department on roles.department_id = department.id
  Left join employee as employee_m on employee.manager_id = employee_m.id;
select
  *
from
  department;
select
  *
from
  roles;
select
  *
from
  employee;