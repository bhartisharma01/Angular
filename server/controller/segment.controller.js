const {
    createSegment,
  createProduct,
  fetchDataBasedOnPurpose
  } = require("../api/segment.service");

  
  module.exports = {
    createSegment: (req, res, next) => {
      const body = req.body;
   
      createSegment(body, (err, results) => {
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

    createProduct: (req, res, next)=>{
const body = req.body;

createProduct(body, (err, results)=>{
    if(err){
        return res.status(500).json({
            success:0,
            message:"Database connection error",
            error:err
        })
    }
    return res.status(200).json({
        success:1,
        data:results
    })
})
    },

    // fetchDataBasedOnPurpose: (req, res) => {
    //     fetchDataBasedOnPurpose((err, results) => {
    //       if (err) {
    //         console.log(err);
    //         return;
    //       }
    //       return res.json({
    //         success: 1,
    //         data: results,
    //       });
    //     });
    //   },
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
  }  