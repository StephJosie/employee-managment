INSERT INTO department (id, department_name)
VALUES  (10, "Engineering"),
        (20, "HR"),
        (30, "Legal"),
        (40, "Finance"),
        (50, "Sales");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (001, "Senior Engineer", "90000", 10),
        (002, "HR Partner", "75000", 20),
        (003, "Junior Analyst", "70000", 30),
        (004, "FP&A Manager", "100000", 40),
        (005, "Sales Associate", "65000", 50);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (100, "Bo", "Bax", 001, 100),
        (101, "Luda", "Vico", 002, 101),
        (102, "Alec", "Aiden", 003. 102),
        (103, "Tesla", "Rosalind", 004, 103),
        (104, "Linus", "Apo", 005, 104);