const express = require("express");
const conn = require("../conn");
const router = express.Router();
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");

//add product
router.post("/addProduct", authenticateToken, checkRole, (req, res) => {
  let product = req.body;
  var query =
    "INSERT INTO product(name, categoryId, description, price, status) VALUES (?, ?, ?, ?, 'true')";

  conn.query(
    query,
    [product.name, product.categoryId, product.description, product.price],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Product added successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

//get all products  authenticateToken

router.get("/getProducts", (req, res) => {
  query =
    "select p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category c where p.categoryId = c.id";
  conn.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

//get by category id  authenticateToken
router.get("/getByCategory/:id", (req, res) => {
  const id = req.params.id;
  query =
    "select id, name from product where categoryId =? and status = 'true'";
  conn.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

//get by product id  authenticateToken
router.get("/getByProduct/:id", (req, res) => {
  const id = req.params.id;
  query = "select id, name, description, price from product where id=? and status ='true'";
  conn.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});


//update product  authenticateToken

router.patch('/updateProduct', (req, res)=>{
    let product = req.body;
    query= "update product set name=?, categoryId=?, description=?, price=? where id=?";
    conn.query(query, [product.name, product.categoryId,product.description, product.price, product.id],(err, results)=>{
        if(!err){
           if(results.affectedRows == 0){
                return res.status(404).json({message:"product not found"})
           }
           return res.status(200).json({message:"Product Updated Successfully"})
        }
        else{
            return res.status(500).json(err);
        }
    })
});

//delete product

router.delete('/deleteProduct/:id', (req, res)=>{
    const id = req.params.id;
    query = "delete from product where id=?";
    conn.query(query, [id], (err, results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"product not found"})
            }
            return res.status(200).json({message:"Product deleted successfully"})
        }
        else{
            return res.status(500).json(err);
        }
    })
});


//update status  authen checkRole

router.patch('/updateStatus', (req, res, next)=>{
    let product = req.body;
    query = "update product set status=? where id=?";
    conn.query(query, [product.status, product.id], (err, results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"Product not found"});
            }
            return res.status(200).json({message:"Product status updated successfully"})
        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
