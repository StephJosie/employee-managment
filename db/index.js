
// const connection = require('./connections');

// class DB {
//     constructor(connection) {
//         this.connection = connection;
//     }

// addEmployee() {
//     let qry = "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee"
//     connection.query(qry, async (err, employees) => {
//         qry = "SELECT id as value, title as name FROM roles"
//         connection.query(qry, async (err, roles) => {
//             const newEmp = await inquirer.prompt(questions.addEmployee(roles, employees));
//             qry = "INSERT INTO employee SET ?"
//             connection.query(qry, newEmp, function (err) {
//                 if (err) throw err;
//                 console.log("New employee added");
//                 start();
//             });
//         })
//     })
// }

// addDepartment() {
//     const departmentDetails = await inquirer.prompt(addDepartmentQuestions)
//     connection.query("INSERT INTO department SET ?", {
//         name: departmentDetails.department_name
//     },
//         function (err) {
//             if (err) throw err;
//             console.log("New department added");
//             init();
//         }
//     );
// }

// addNewRole() {
//     const roleDetails = await inquirer.prompt(addRole)
//     connection.query("INSERT INTO role SET ?", {
//         title: roleDetails.titleRole,
//         salary: roleDetails.salary,
//         department_id: roleDetails.departmentIDrole
//     },
//         function (err) {
//             if (err) throw err;
//             console.log("New department added");
//             init();
//         }
//     );
// }

// updateRole() {
//     connection.query("SELECT * FROM employee", async (err, employee) => {
//         const {
//             worker,
//             newrole
//         } = await inquirer.prompt([{
//             type: "list",
//             message: "Choose an employee to update:",
//             name: "worker",
//             choices: () => {
//                 return employee.map((employee) => employee.last_name);
//             },
//         },
//         {
//             type: "list",
//             message: "What is this employee's new role?",
//             name: "newrole",
//             choices: () => {
//                 return employee.map((employee) => employee.role_id);
//             }
//         }
//         ]);
//         connection.query(
//             "UPDATE employee SET ? WHERE ?",
//             [{
//                 role_id: newrole,
//             },
//             {
//                 last_name: worker,
//             },
//             ],
//             function (err, res) {
//                 if (err) throw err;
//                 console.log(res.affectedRows + " products updated!\n");
//                 console.table(employee);
//                 init();
//             }
//         );
//     })
// }

// viewDepartments() {
//     return this.connection.query("SELECT * FROM department", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//         init();
//     });
// }

// viewEmployees() {
//     connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//         init();
//     });
// }

// viewRoles() {
//     connection.query("SELECT title FROM role", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//         init();
//     });
// }

// employeesByManager() {
//     connection.query("SELECT * FROM employee", async (err, employee) => {
//         const {
//             managerID
//         } = await inquirer.prompt([{
//             type: "list",
//             message: "Choose a manager:",
//             name: "managerID",
//             choices: () => {
//                 return employee.map((manager) => manager.manager_id);
//             },
//         },]);
//         connection.query(`SELECT first_name, last_name FROM employee WHERE manager_id=${managerID}`, function (err, res) {
//             if (err) throw err;
//             console.table(res);
//             init();
//         });
//     })
// }

// employeesByDepartment() {
//     connection.query("SELECT * FROM department", async (err, department) => {
//         const {
//             departmentName
//         } = await inquirer.prompt([{
//             type: "list",
//             message: "Select a Department:",
//             name: "departmentName",
//             choices: () => {
//                 return department.map((department) => department.name);
//             }
//         }]);
//         connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", function (err, res) {
//             if (err) throw err;
//             console.table(res.filter((name) => departmentName === name.department));
//             init();
//         });
//     })
// }
// removeRole() {
//     connection.query("SELECT * FROM role", async (err, role) => {
//         const {
//             roleName
//         } = await inquirer.prompt([{
//             type: "list",
//             message: "Select a role to delete:",
//             name: "roleName",
//             choices: () => {
//                 return role.map((role) => role.title);
//             }
//         }]);
//         console.log(roleName);
//         connection.query(`DELETE FROM role WHERE ?`, {
//             title: roleName
//         },
//             function (err, res) {
//                 if (err) throw err;
//                 console.table(role);
//                 init();
//             });
//     })
// }
// removeEmployee() {
//     connection.query("SELECT * FROM employee", async (err, employee) => {
//         const {
//             employeeName
//         } = await inquirer.prompt([{
//             type: "list",
//             message: "Select an employee to delete:",
//             name: "employeeName",
//             choices: () => {
//                 return employee.map((employee) => `${employee.last_name}`);
//             }
//         }]);
//         connection.query(`DELETE FROM employee WHERE ?`, {
//             last_name: employeeName
//         },
//             function (err, res) {
//                 if (err) throw err;
//                 console.table(res);
//                 init();
//             });
//     })
// }

// module.exports = new DB(connection);


const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }

    createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }

    createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }


    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    findAllEmployeesByManager(managerId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
            managerId
        );
    }


    removeEmployee(employeeId) {
        return this.connection.promise().query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }






    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }



    removeRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }


    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }



    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }
}



module.exports = new DB(connection);

