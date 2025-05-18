const dotenv = require("dotenv")
dotenv.config()

const config = {
  development: {
    username: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "user",
    database: process.env.DB_NAME ?? "airbnb_dev",
    host: process.env.DB_HOST ?? "localhost",
    dialect: "mysql",
  },
  /* test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "17.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  } */
}
module.exports = config
