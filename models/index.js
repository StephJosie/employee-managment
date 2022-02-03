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
    creatEmployee
}