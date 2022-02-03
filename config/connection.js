const mysql = require("mysql2")
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_dbs"
})
console.log("connected to employee_db")
connection.connect(function (err) {
    if (err) throw err;
})

module.exports = connection