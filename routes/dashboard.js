const express = require("express");

const conn = require("../conn");
const router = express.Router();
const { authenticateToken } = require("../services/auth");

router.get("/details", (req, res) => {
  var categoryCount;
  var productCount;
  var billCount;
  query =
    "SELECT (SELECT COUNT(id) FROM category) as categoryCount,  (SELECT COUNT(id) FROM product) as productCount, (SELECT COUNT(id) FROM bill) as billCount;";
  conn.query(query, (err, results) => {

    if (!err) {
      categoryCount = results[0].categoryCount;
      productCount = results[0].productCount;
      billCount = results[0].billCount;
      var data = {
        category: categoryCount,
        product: productCount,
        bill: billCount,
      };
      return res.status(200).json(data);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
