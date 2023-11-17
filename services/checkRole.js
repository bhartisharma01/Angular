require("dotenv").config();
function checkRole(req, res, next) {
  console.log("process user value", process.env.USERS);
  if (res.locals.role == process.env.USERS) {
    res.sendStatus(401);
  } else {
    console.log("user");
    next();
  }
}
module.exports = { checkRole };
