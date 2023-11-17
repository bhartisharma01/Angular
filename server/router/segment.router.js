const {createSegment,createProduct, fetchDataBasedOnPurpose} = require('../controller/segment.controller')
const segmentRouter = require('express').Router();

segmentRouter.post('/createSegment',createSegment)
segmentRouter.post('/createProduct', createProduct)
// segmentRouter.post('/getPurpose', fetchDataBasedOnPurpose)


module.exports= segmentRouter;