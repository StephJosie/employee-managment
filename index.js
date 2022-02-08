// const { prompt } = require("inquirer")
// const db = require("./db")
// require("console.table");

// function loadMainPrompts() {
//     prompt([
//         {
//             type: "list",
//             name: "choice",
//             message: "What would you like to do?",
//             choices: [
//                 {
//                     name: "View All Employees",
//                     value: "VIEW_EMPLOYEES"
//                 }
//             ]
//         }
//     ])
// }

// function viewEmployees() {
//     db.findAllEmployees()
//         .then(([rows]) => {
//             let employees = rows;
//             console.log("\n");
//             console.table(employees);
//         })
//         .then(() => loadMainPrompts())
// }
// viewEmployees();
const express = require('express')
const mysql = require("mysql2")
const PORT = process.env.PORT || 3030
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db')
);

// app.post('/api/new-employee')
app.post('/api/new-employee', ({ body }, res) => {
    const sql = `INSERT INTO employee (employee_name)
      VALUES (?)`;
    const params = [body.employee_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});
app.get('/api/employees', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});







