const db = require("../../helper(db)/connection");
const { v4: uuidv4 } = require("uuid");

const profileDashboardSocmedModel = {
  //   get: function (queryParams) {
  //     console.log(queryParams);
  //     return new Promise((resolve, reject) => {
  //       db.query(
  //         `SELECT user.id, user.image, user.name, user.company_role, user.job_type, user.address, user.bio, skill.id, socialmedia.id FROM user
  //               INNER JOIN skill ON skill.id=user.id ${this.query(
  //                 queryParams,
  //                 queryParams.sortBy,
  //                 queryParams.limit
  //               )}`,

  //         (err, result) => {
  //           if (err) {
  //             return reject(err.message);
  //           } else {
  //             return resolve(result.rows);
  //           }
  //         }
  //       );
  //     });
  //   },

  get: function (queryParams) {
    console.log(queryParams);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT userprofile.id, userprofile.user_id, userprofile.skill_id, socialmedia_id FROM userprofile
                  INNER JOIN skill ON skill.id=user.id ${this.query(
                    queryParams,
                    queryParams.sortBy,
                    queryParams.limit
                  )}`,
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

  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from socialmedia WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },

  add: ({ link, user_id, socmed_name }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO socialmedia (id, link, user_id, socmed_name) VALUES ("${uuidv4()}","${link}","${user_id}","${socmed_name}")`,
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

module.export = profileDashboardSocmedModel;
