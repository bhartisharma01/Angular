const express = require("express");
const conn = require("../conn");
const router = express.Router();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
let fs = require("fs");
var uuid = require("uuid");
const { authenticateToken } = require("../services/auth");

//generating report - authenticateToken
router.post("/generateReport", authenticateToken, (req, res) => {
  const generatedUuid = uuid.v1();
  const orderDetails = req.body;
  var productDetailsReport = JSON.parse(orderDetails.productDetails);
  query =
    "insert into bill (name, uuid, email, mobile, paymentMethod, total, productDetails, createdBy) values (?,?,?,?,?,?,?,?)";
  const createdBy = res.locals.email;
  //console.log("checking res email",res.locals.email)
  conn.query(
    query,
    [
      orderDetails.name,
      generatedUuid,
      orderDetails.email,
      orderDetails.mobile,
      orderDetails.paymentMethod,
      orderDetails.totalAmount,
      orderDetails.productDetails,
      createdBy,
    ],
    (err, results) => {
      if (!err) {
        ejs.renderFile(
          path.join(__dirname, "", "report.ejs"),
          {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            mobile: orderDetails.mobile,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount,
          },
          (err, results) => {
            if (!err) {
              const pdfPath = path.join(
                __dirname,
                "..",
                "generated_pdf",
                generatedUuid + ".pdf"
              );
              pdf.create(results).toFile(pdfPath, function (err, data) {
                if (err) {
                  console.log(err);
                  return res.status(500).json(err);
                } else {
                  return res.status(200).json({ uuid: generatedUuid });
                }
              });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

//get pdf - authenticate

router.post("/getPdf", (req, res) => {
  const orderDetails = req.body;
  const pdfPath = "generated_pdf" + orderDetails.uuid + ".pdf";
  if (fs.existsSync(pdfPath)) {
    res.contentType("application/pdf");
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    var productDetailsReport = JSON.parse(orderDetails.productDetails);
    ejs.renderFile(
      path.join(__dirname, "", "report.ejs"),
      {
        productDetails: productDetailsReport,
        name: orderDetails.name,
        email: orderDetails.email,
        mobile: orderDetails.mobile,
        paymentMethod: orderDetails.paymentMethod,
        totalAmount: orderDetails.totalAmount,
      },
      (err, results) => {
        if (!err) {
          const pdfPath = path.join(
            __dirname,
            "..",
            "generated_pdf",
            orderDetails.uuid + ".pdf"
          );
          pdf.create(results).toFile(pdfPath, function (err, data) {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            } else {
              res.contentType("application/pdf");
              fs.createReadStream(pdfPath).pipe(res);
            }
          });
        } else {
          return res.status(500).json(err);
        }
      }
    );
  }
});

// get all bills - authenticate

router.get("/getallBills", (req, res) => {
  query = "select * from bill order by total DESC";
  conn.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// delete bill

router.delete("/deleteBill/:id", (req, res) => {
  const id = req.params.id;
  query = "delete from bill where id=?";
  conn.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "Bill not found" });
      } else {
        return res.status(200).json({ message: "Bill deleted Successfully" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
