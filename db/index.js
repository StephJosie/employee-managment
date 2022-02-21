const connection = require('../server');
// const promise = require('bluebird')

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }
    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }
    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }
    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }
}

// class DB {
//     constructor(connection) {
//         this.connection = connection;
//     }
//     findAllEmployees = () => {
//         return new Promise().query(
//             "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
//         );
//     }
//     findAllRoles = () => {
//         return new Promise().query(
//             "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
//         );
//     }
//     findAllDepartments = () => {
//         return new Promise().query(
//             "SELECT department.id, department.name FROM department;"
//         );
//     }
//     createEmployee = (employee) => {
//         return new Promise().query("INSERT INTO employee SET ?", employee);
//     }
// }

module.exports = new DB