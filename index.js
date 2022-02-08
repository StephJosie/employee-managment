const { prompt } = require("inquirer")
const db = require("./db")
require("console.table");

function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                }
            ]
        }
    ])
}

function viewEmployees()
db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
    .then(() => loadMainPrompts())
viewEmployees();