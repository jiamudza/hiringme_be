const db = require("../../helper(db)/connection");
const { v4: uuidv4 } = require("uuid");

const profileDashboardSocmedModel = {
  get: function (queryParams) {
    console.log(queryParams);
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM socialmedia`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },

  getSocmedById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT users.id, users.name, users.email, users.company, users.company_role, json_agg(row_to_json(socialmedia)) contact
      from users
      LEFT JOIN socialmedia on users.id=socialmedia.user_id
      GROUP BY users.id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },

  add: ({ link, user_id, socmed_name }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO socialmedia (id, link, user_id, socmed_name) VALUES ('${uuidv4()}','${link}','${user_id}','${socmed_name}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({ user_id, link, socmed_name });
          }
        }
      );
    });
  },

  update: ({ id, link, user_id, socmed_name }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM socialmedia WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `UPDATE socialmedia SET user_id='${
              user_id || result.rows[0].user_id
            }', link='${link || result.rows[0].link}',
            socmed_name='${socmed_name || result.rows[0].socmed_name}'
               WHERE id='${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve({ id, user_id, socmed_name });
              }
            }
          );
        }
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from socialmedia WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = profileDashboardSocmedModel;
