const { prompt } = require("inquirer")
const logo = require("asciiart-logo")
const db = require("./db")
const { INITIALLY_DEFERRED } = require("sequelize/dist/lib/deferrable")
require("console.table")

