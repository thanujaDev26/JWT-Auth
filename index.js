const express = require('express');
const cors = require('cors');

require('dotenv').config();


const studentRoutes = require('./routes/StudentRouter');
const teacherRoutes = require('./routes/TeacherRouter');
const adminRoutes = require('./routes/AdminRouter');


const app = express();

//Middleware stack
app.use(express.json());
app.use(cors());



//Routes stack
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/admin', adminRoutes);



module.exports = app;
