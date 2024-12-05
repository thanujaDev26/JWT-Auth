const mongoose = require('mongoose');
require('dotenv').config();
let app = require('./index')


let uri = process.env.MONGODB_URI;
const port = process.env.PORT;


console.log('URI is '+uri)

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl : true
}).then((data)=>{
    // console.log(data);
    app.listen(port,()=>console.log(`App is running on port ${port}`));
}).catch((error)=>{
    console.log(error);
})