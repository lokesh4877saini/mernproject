const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middleware/error')
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


// Route import 
// for product
const product = require("./routes/productRoute") 
app.use("/api/v1",product);


// for user

const User = require('./routes/userRoute')
app.use("/api/v1",User); 

// for order
const Order = require('./routes/orderRoute');
app.use('/api/v1',Order);
// Middleware for Error
app.use(errorMiddleware)
module.exports = app;