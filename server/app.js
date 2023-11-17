require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const userRouter = require('./router/user.router')
const segmentRouter = require('./router/segment.router')
const cors = require('cors');  
app.use(express.json())
// Middleware to parse JSON


// Middleware to parse URL-encoded data
// app.use(express.urlencoded({ extended: true }));

  app.use(cors())


// app.get('/api', (req, res)=>{
//     res.json({
//         success:0,
//         message:"this is test api"
//     })
// })
app.use('/api/users', userRouter);
app.use('/api/segment',segmentRouter)

 

app.listen(process.env.APP_PORT, ()=>{
    console.log('server is running at port ', process.env.APP_PORT)
})