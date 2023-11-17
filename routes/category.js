const express = require("express");
const conn = require("../conn");
const router = express.Router();
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");

// add category

router.post("/addCategory", authenticateToken, checkRole, (req, res) => {
  let category = req.body;
  query = "insert into category (name) values (?)";
  conn.query(query, [category.name], (err, results) => {
    if (!err) {
      return res.status(200).json({ messgae: "Category Added Successfully" });
    } else {
      return res.status(500).json(err);
    }
  });
});

//get all categories
router.get("/getCategory", authenticateToken, (req, res) => {
  query = "select * from category order by name";
  conn.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

//update category

router.patch(
  "/updateCategory",
  authenticateToken,
  checkRole,
  (req, res, next) => {
    let category = req.body;
    query = "update category set name =? where id=?";
    conn.query(query, [category.name, category.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res
            .status(404)
            .json({ messgae: "category id doesn't exists" });
        }
        return res
          .status(200)
          .json({ messgae: "Category Updated Successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

//delete  category
router.delete("/deleteCategory/:id", (req, res) => {
  const id = req.params.id;
  query = "delete from category where id=?";
  conn.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ messgae: "Category not found" });
      } else {
        return res
          .status(200)
          .json({ messgae: "Category deleted successfully" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
