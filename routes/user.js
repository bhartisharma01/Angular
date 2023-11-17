const express = require("express");
const conn = require("../conn");
const router = express.Router();

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");

// require("dotenv").config();

// signup

router.post("/signup", (req, res) => {
  let user = req.body;
  console.log("checing user data for signup", user)
  query = "select email, password, role, status from user where email=?";
  conn.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        query =
          "insert into user(name, mobile,email,password, status, role) values (?,?,?,?, 'false','user')";
        conn.query(
          query,
          [user.name, user.mobile, user.email, user.password],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Successfully Registered" });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Email already exist" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// login

router.post("/login", (req, res) => {
  let user = req.body;
  query = "select email, password, role, status from user where email=?";

  conn.query(query, [user.email], (err, results) => {
    if (!err) {
      //console.log("resutss", results);
      if (results.length <= 0 || results[0].password != user.password) {
        return res
          .status(401)
          .json({ message: "Incorrect Username or password" });
      } else if (results[0].status == "false") {
        return res.status(401).json({ message: "Wait for an admin approval" });
      } else if (results[0].password == user.password) {
        const response = { email: results[0].email, role: results[0].role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: "1h",
        });
        res.status(200).json({ token: accessToken });
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
checkRole;

//forgot-password

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/forgotPassword", (req, res) => {
  let user = req.body;
  
  query = "select email, password from user where email =?";
  
  conn.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res
          .status(200)
          .json({ message: "Password sent successfully to your email" });
        
      } else {
        var mailOptions = {
          from: process.env.EMAIL,
          to: results[0].email,
          subject: "password by cafe management system",
          html:
            "<p><b>Login details for cafe management system</b><br><b>Email:</b>" +
            results[0].email +
            "<br><b>Password:</b>" +
            results[0].password +
            '<br><a href="http://localhost:4200">click here to login</a></p>',
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent:" + info.response);
          }
        });
        return res
          .status(200)
          .json({ message: "password sent successfully to your email" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// get all users
router.get("/get", authenticateToken, checkRole, (req, res) => {
  query = "select id,name, mobile, email, status from user where role='user'";
  conn.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// update status of user
router.patch("/update", authenticateToken, checkRole, (req, res) => {
  let user = req.body;
  query = "update user set status=? where id=?";
  conn.query(query, [user.status, user.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "user id doesnt' exists" });
      }
      return res.status(200).json({ message: "user updated successfully" });
    } else {
      return res.status(500).json(err);
    }
  });
});

// update  user
router.patch("/updateUser", (req, res) => {
  let user = req.body;
  query = "update user set name=?, mobile=?, email=?, status=? where id=?";
  conn.query(
    query,
    [user.name, user.mobile, user.email, user.status, user.id],
    (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "user id doesnt' exists" });
        }
        return res.status(200).json({ message: "user updated successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

// to check token
router.get("/checkToken", authenticateToken, checkRole, (req, res) => {
  return res.status(200).json({ message: "true" });
});

//to change password

router.post("/changePassword", authenticateToken, (req, res) => {
  let user = req.body;
  const email = res.locals.email;
  query = "select * from user where email=? and password=?";
  conn.query(query, [email, user.oldPassword], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "Incorrect old Password" });
      } else if (results[0].password == user.oldPassword) {
        query = "update user set password=? where email =?";
        conn.query(query, [user.newPassword, email], (err, results) => {
          if (!err) {
            return res
              .status(200)
              .json({ message: "Password updated successfully" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong. Please try again later" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
