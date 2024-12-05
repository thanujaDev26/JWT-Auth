const express = require('express');
const cors = require('cors');

require('dotenv').config();


let userRouter = require('./routes/userRouter')
const studentRouter = require('./routes/studentRouter');


const app = express();

//Middleware stack
app.use(express.json());
app.use(cors());
const auth = require('./middleware/auth');


//Routes stack
app.use('/api/user',userRouter);
app.use('/api/student',auth,studentRouter);


module.exports = app;
