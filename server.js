


const { prompt } = require("inquirer");
const db = require('./db');
// const connection = require('./db/connections.js');
// const questions = require('./db/index.js');
const cTable = require("console.table");
const logo = require("asciiart-logo");



// displayLogo();
// start();
// init();

function init() {
    console.log(
        logo({
            name: 'EMS',
            lineChars: 10,
            padding: 2,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'white',
            textColor: 'white',
        })
            .render()
    );
    loadPrompts();
}

function loadPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "Add Employee",
                    value: "ADD_AN_EMPLOYEE"
                },
                {
                    name: "Add Department",
                    value: "ADD_A_DEPARTMENT"
                },
                {
                    name: "Add Role",
                    value: "ADD_A_ROLE"
                },
                {
                    name: "View Departments",
                    value: "View_departments"
                },
                {
                    name: "View Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Update Employee's Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "View All Employees by Manager",
                    value: "VIEW_ALL_EMPLOYYES_BY_MANAGER"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "View All Employees by Department",
                    value: "VIEW_ALL_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ALL_ROLES"
                },

                {
                    name: "Remove Roles",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                },
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case "ADD_AN_EMPLOYEE":
                addEmployee();
                break;
            case "ADD_A_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_A_ROLE":
                addNewRole();
                break;
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateRole();
                break;
            case "VIEW_ALL_EMPLOYEES_BY_MANAGER":
                employeesByManager();
                break;
            case "REMOVE_EMPLOYEE":
                removeEmployee();
                break;
            case "VIEW_ALL_EMPLOYEES_BY_DEPARTMENT":
                employeesByDepartment();
                break;
            case "VIEW_ALL_ROLES":
                viewRoles();
                break;
            case "REMOVE_ROLE":
                removeRole();
                break;
            // default:
            //     quit();
        }
    }
    )
}


function addEmployee() {
    prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            db.findAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleSs = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    prompt({
                        type: "list",
                        name: "roleId",
                        message: "What is the employee's role?",
                        choices: roleSs
                    })
                        .then(res => {
                            let roleId = res.roleId;

                            db.findAllEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerSs = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managers.unshift({ name: "None", value: null });

                                    prompt({
                                        type: "list",
                                        name: "managerId",
                                        message: "Who is the employee's manager?",
                                        choices: managerSs
                                    })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            db.createEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `Added ${firstName} ${lastName} to the database`
                                        ))
                                        .then(() => loadPrompts())
                                })
                        })
                })
        })
}

function addDepartment() {
    prompt([
        {
            name: "name",
            message: "What is the name of the department?"
        }
    ])
        .then(res => {
            let name = res;
            db.createDepartment(name)
                .then(() => console.log(`Added ${name.name} to the database`))
                .then(() => prompts())
        })
}
function addNewRole() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentSs = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentSs
                }
            ])
                .then(role => {
                    db.createRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`))
                        .then(() => loadPrompts())
                })
        })
}

function viewDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            let department = rows;
            console.log("\n");
            console.table(department);
        })
        .then(() => loadPrompts());
}
// function viewDepartments() {
//     db.findAllDepartments()
//     console.table(results);

// }






function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employee);
        })
        .then(() => loadPrompts());
}

function updateRole() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeSs = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role do you want to update?",
                    choices: employeeSs
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.findAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleSs = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Which role do you want to assign the selected employee?",
                                    choices: roleSs
                                }
                            ])
                                .then(res => db.updateRole(employeeId, res.roleId))
                                .then(() => console.log("Updated employee's role"))
                                .then(() => loadPrompts())
                        });
                });
        })
}


function employeesByManager() {
    db.findAllEmployees()
        .then(([rows]) => {
            let managers = rows;
            const managerSs = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "managerId",
                    message: "Which employee do you want to see?",
                    choices: managerSs
                }
            ])
                .then(res => db.findAllEmployeesByManager(res.managerId))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    if (employees.length === 0) {
                        console.log("Selected employee has no direct reports");
                    } else {
                        console.table(employee);
                    }
                })
                .then(() => loadPrompts())
        });
}


function removeEmployee() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeSs = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee do you want to remove?",
                    choices: employeeSs
                }
            ])
                .then(res => db.removeEmployee(res.employeeId))
                .then(() => console.log("Removed employee"))
                .then(() => loadPrompts())
        })
}

function employeesByDepartment() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentSs = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "departmentId",
                    message: "Which department would you like to see?",
                    choices: departmentSs
                }
            ])
                .then(res => db.findAllEmployeesByDepartment(res.departmentId))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    console.table(employee);
                })
                .then(() => loadPrompts())
        });
}
function viewRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(role);
        })
        .then(() => loadPrompts());
}



function removeRole() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleSs = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "roleId",
                    message:
                        "Which role do you want to remove?",
                    choices: roleSs
                }
            ])
                .then(res => db.removeRole(res.roleId))
                .then(() => console.log("Removed role"))
                .then(() => loadPrompts())
        })
}

// function quit() {
//     console.log("Done")
//     process.exit();
// }
init();




    // async function addEmployee() {
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

    // async function addDepartment() {
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

    // async function addNewRole() {
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

    // async function updateRole() {
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

    // function viewDepartments() {
    //     return this.connection.query("SELECT * FROM department", function (err, res) {
    //         if (err) throw err;
    //         console.table(res);
    //         init();
    //     });
    // }

    // function viewEmployees() {
    //     connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", function (err, res) {
    //         if (err) throw err;
    //         console.table(res);
    //         init();
    //     });
    // }

    // function viewRoles() {
    //     connection.query("SELECT title FROM role", function (err, res) {
    //         if (err) throw err;
    //         console.table(res);
    //         init();
    //     });
    // }

    // function employeesByManager() {
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

    // function employeesByDepartment() {
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

    // async function removeRole() {
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

    // function removeEmployee() {
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
