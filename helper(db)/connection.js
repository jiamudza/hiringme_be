const { Client } = require("pg");

const {HOST, DB_NAME, PORT, USER, PASSWORD} = process.env;

const db = new Client({
  user: USER,
  host: HOST,
  database: DB_NAME,
  password: PASSWORD,
  port: PORT
});

db.connect((err) => {
  if (!err) {
    console.log("Database Hireme Connected");
  } else {
    console.log("Database Connection Failed", err);
  }
});

module.exports = db;
