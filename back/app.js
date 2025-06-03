const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middleware/error')
const dotenv = require('dotenv');
dotenv.config({path:"back/config/config.env"});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","https://lokesh4877saini.github.io"],
    credentials:true,
}))
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

// for payment

const Payment = require('./routes/paymentRoute');
app.use('/api/v1',Payment);
// Middleware for Error
app.use(errorMiddleware)
module.exports = app;