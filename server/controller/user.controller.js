const {
  create,
  getUserByid,
  getUsers,
  updateUser,
  deleteUser,
  getUserByemail,
  createRole,
  checkEmailExists,
} = require("../api/user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  create: (req, res, next) => {

    console.log('befire useronfor', req.body)
    let userInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      mobileNo: req.body.mobileNo,
      role: req.body.role,
      address: {
        current_address: req.body.address.current_address,
        permanent_address: req.body.address.permanent_address,
      },
      education: {
        school: req.body.education.school,
        graduation: req.body.education.graduation,
      },
      profile: req.file.filename
    };
    console.log("profile in the body req", userInfo);
    checkEmailExists(userInfo.email, (err, resul) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "something went wrong",
        });
      }
      if (resul.length > 0) {
        return res.status(400).json({
          success: 0,
          message: "email already exists",
        });
      } else {
        const salt = genSaltSync(10);
        userInfo.password = hashSync(userInfo.password, salt);

        create(userInfo, (err, results) => {
          //   console.log('profile datataassas', results.profile)
          if (err) {
            //console.log("body data", body);
            return res.status(500).json({
              success: 0,
              message: "database connection error",
              error: err,
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      }
    });
  },

  createRole: (req, res, next) => {
    const body = req.body;

    createRole(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "database connection error",
          error: err,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getUserByid: (req, res) => {
    const id = req.params.id;
    getUserByid(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "something went wrong",
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  checkEmailExists: (req, res) => {
    const email = req.body.email;
    checkEmailExists(email, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "something went wrong",
        });
      }
      console.log("check email result length", results.length);
      if (results.length > 0) {
        return res.status(200).json({
          success: 0,
          message: "email already exists",
        });
      } else {
        return res.status(200).json({
          success: 1,
          data: results,
        });
      }
    });
  },
  // getUserByemai: (req, res)=>{
  //     const email =req.body;
  //     getUserByemail(email, (err, results)=>{
  //         console.log('results', results)
  //         if(err){
  //            return res.status(500).json({
  //                 success:0,
  //                 message:"something went wrong"
  //             })
  //         }
  //         if(!results){

  //             return res.status(404).json({
  //                 success:0,
  //                 message:"Record not found"
  //             })
  //         }
  //       else{
  //         console.log('results', results)
  //         return  res.status(200).json({
  //             success:1,
  //             data:results
  //         })
  //       }
  //     })
  // },

  login: (req, res) => {
    const body = req.body;

    getUserByemail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },

  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateUser: (req, res) => {
    
    const body = req.body;
    console.log('update usser body', body);
    const id = req.params.id;
    const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    updateUser(id,body, (err, results) => {
      console.log("body::::::",body )
      if (err) {
        return res.status(500).json({
          success: 0,

          message: "seomething went wrong",
          error: err,
        });
      }

      return res.status(200).json({
        success: 1,
        message: "User updated successfully",
      });
    });
  },

  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "User deleted successfully",
      });
    });
  },

  // login:(req, res)=>{
  //     const body=req.body;
  //     getUserByemail(body.email, (err, results)=>{
  //         if(err){
  //             console.log(err);
  //         }
  //         if(!results){
  //             return res.json({
  //                 success:0,
  //                 message:"Invalid email or password"
  //             })
  //         }
  //         const result = compareSync(body.password, results.password);
  //         if(results){
  //             results.password = undefined;
  //             const jsonwebtoken = sign({result:results}, "qwerty",{
  //                 expiresIn:"1hr"
  //             })
  //             return res.json({
  //                 success:1,
  //                 message:"Login Successfully",
  //                 token:jsonwebtoken

  //             })
  //         }
  //     else{
  //         return res.json({
  //             success:0, message:"Invalid email of password"
  //         })
  //     }
  //     })
  // }
};
