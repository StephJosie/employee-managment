const connection = require("../config/connection")
class DB {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees() {
        return this.connection.promise().query(

        )
    }
}