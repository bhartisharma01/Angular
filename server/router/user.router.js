const {
  create,
  getUserByid,
  getUsers,
  updateUser,
  deleteUser,
  getUserByemail,
  login,
  createRole,
  checkEmailExists,
} = require("../controller/user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/tokenValidation");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./src/profiles",
  filename: (req, file, callback) => {


    const extname = path.extname(file.originalname);
    const filename = path.basename(file.originalname, extname);
    const newFilename = `${filename}_${Date.now()}${extname}`;
    return callback(null, newFilename);
    // console.log('file name',`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  
  },
});
const upload = multer({
  storage: storage,
});

router.post("/createUser", upload.single("profile"), create);

router.get("/getUsers", getUsers);
router.get("/getUserByid/:id", getUserByid);
// router.get('/getUserByemail', getUserByemai);
router.patch("/updateUser/:id", updateUser);
router.delete("/deleteUser", deleteUser);
router.post("/createrole", createRole);
router.post("/login", login);
router.post("/existEmail", checkEmailExists);

module.exports = router;
