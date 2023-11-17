const pool = require("../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `INSERT INTO registration(firstName,
            lastName,
            email,
            password,
            mobileNo, 
            role,
            current_address,
            permanent_address,
            school,
            graduation, 
            profile)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.mobileNo,
        data.role,
        data.address.current_address,
        data.address.permanent_address,
        data.education.school,
        data.education.graduation,
        data.profile,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results);
      }
    );
  },
  checkEmailExists: (email, callback) => {
    pool.query(
      `SELECT * FROM registration WHERE email=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results);
      }
    );
  },

  createRole: (data, callback) => {
    pool.query(
      `INSERT INTO user_role(role)
            VALUES (?)`,
      [data.role],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getUsers: (callback) => {
    pool.query(`select *from registration`, [], (error, results, fields) => {
      if (error) {
        // console.log(error)
        return callback(error);
      }
      const formattedUsers = results.map((user) => {
        return {
          id:user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          mobileNo: user.mobileNo,
          role: user.role,
          address: {
            current_address: user.current_address,
            permanent_address: user.permanent_address,
          },
          education: {
            school: user.school,
            graduation: user.graduation,
          },
          profile: user.profile,
        };
      });
      return callback(null, formattedUsers);
    });
  },

  getUserByid: (id, callback) => {
    pool.query(
      `select * from registration where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        const formattedUser = results.map((user) => {
          return {
            id:user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            mobileNo: user.mobileNo,
            role: user.role,
            address: {
              current_address: user.current_address,
              permanent_address: user.permanent_address,
            },
            education: {
              school: user.school,
              graduation: user.graduation,
            },
            profile: user.profile,
          };
        });
        return callback(null, formattedUser);
      }
    );
  },

  getUserByemail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        // console.log('in getuseremail service with 0', results[0])
        // console.log('in getuseremail service without 0', results[0])
        return callBack(null, results[0]);
      }
    );
  },

  //   updateUser:(data, callback)=>{
  //     pool.query(`update registration set firstName=?, lastName=?,email=?, mobileNo=? where id=?`,
  //     [
  //         data.firstName,
  //         data.lastName,
  //         data.email,
  //         data.password,
  //         data.mobileNo,
  //         data.id
  //     ],
  //     (error, results, fields)=>{
  //         if(error){
  //             return callback(error)
  //         }
  //         return callback(null,results[0]);
  //     })
  //   },

  updateUser: (id,data, callBack) => {
    pool.query(
      `update registration set firstName=?, lastName=?, email=?, password=?, mobileNo=?, role=?, current_address=?, permanent_address=?, school=?, graduation=? where id = ?`,
      [
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.mobileNo,
        data.role,
        data.address.current_address,
        data.address.permanent_address,
        data.education.school,
        data.education.graduation,
        id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } else {
          console.log("results of update user", results)
          return callBack(null, results);
        }
      }
    );
  },

  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
