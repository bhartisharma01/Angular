const pool = require('../config/database')

module.exports = {
    createSegment: (data, callback) => {
      pool.query(
        `INSERT INTO segment(segmentCode,
              segmentName)
              VALUES (?,?)`,
        [data.segmentCode, data.segmentName],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    },

    createProduct:(data, callback)=>{
        pool.query(`INSERT INTO product(productName, description, price, segmentName) VALUES (?,?,?,?)`,
        
        [data.productName, data.description, data.price, data.segmentName],
        (error, results, fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        )
    },

//  fetchDataBasedOnPurpose: (req, res) => {
//         const {purpose} = req.query.purpose;
//         if (purpose === 'segment') {
//             pool.query(`select * from segment`,
//             [],
//             (error, results, fields) => {
//               if (error) {
//                  // console.log(error)
//                 return callback(error);
//               }
//               return callback(null, results);
//             }
//           )
//         } else if (purpose === 'product') {
//             pool.query(`select * from product`,
//             [],
//             (error, results, fields) => {
//               if (error) {
//                  // console.log(error)
//                 return callback(error);
//               }
//               return callback(null, results);
//             }
//           )
//         } else {
//           res.status(400).json({ message: 'Invalid purpose parameter' });
//         }
//       },
   

}