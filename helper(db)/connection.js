const { Client } = require("pg");

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "hiringme",
  password: "jiamudza471",
  port: 5432,
});

db.connect((err) => {
  if (!err) {
    console.log("Database Hireme Connected");
  } else {
    console.log("Database Connection Failed", err);
  }
});

module.exports = db;
