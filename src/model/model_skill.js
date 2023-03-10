const db = require("../../helper(db)/connection");
const { v4: uuidv4 } = require("uuid");

const profileDashboardSkillModel = {
  get: function (queryParams) {
    console.log(queryParams);
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM skill`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },

  getSkillById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT users.id, users.name, users.email, users.company, users.company_role, json_agg(row_to_json(skill)) skills
         from users
      LEFT JOIN skill on users.id=skill.user_id
      GROUP BY users.id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },

  add: ({ user_id, skill_name }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO skill (id, user_id, skill_name) VALUES ('${uuidv4()}','${user_id}','${skill_name}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({ user_id, skill_name });
          }
        }
      );
    });
  },

  update: ({ id, user_id, skill_name }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM skill WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `UPDATE skill SET user_id='${
              user_id || result.rows[0].user_id
            }', skill_name='${skill_name || result.rows[0].skill_name}'
             WHERE id='${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve({ id, user_id, skill_name });
              }
            }
          );
        }
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from skill WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = profileDashboardSkillModel;
