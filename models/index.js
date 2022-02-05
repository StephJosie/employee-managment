const connection = require("../config/connection")
class DB {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees() {
        return this.connection.promise().query(
            "Sleect employee.id,"

        );
    }
    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query(
            "Select id, first_name,",
            emplyeeId
        );
    }
    creatEmployee(employee) {
        return this.connection.promise().query("Insert into employee,", employee);

    }
    removeEmployee(employeeId) {
        return this.connection.promis().query(
            "Delete",
            employeeId
        )
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "Update", [roleId, employeeId]
        )
    }
    findAllRoles() {
        return this.connection.promise().query(
            "Update"
        )
    }

    createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);

    }
    removeRole(role) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);

    }

}