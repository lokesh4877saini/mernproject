const app = require('./app');
require('dotenv').config({path:"back/config/config.env"})
const cloudinary = require('cloudinary')
const connection = require('./config/db');
const PORT = process.env.PORT ;
// connecting with database
connection();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_SECRET:process.env.CLOUDINARY_API_SECRET
})
app.get('/',(req,res)=>{
    res.send("okey");
})
const server = app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
}) 

// suppose config.env we wrongly type data connection string then we caught error and our server will down 
// it is called unhandled Promise Rejection
process.on('unhandledRejection',err=>{
    console.log(`Error : ${err}`);
    console.log("Shutting down the server due to unhandled Promise Rejection")
    server.close(()=>{
        process.exit(1);
    });
})
// CLOUDINARY_URL=cloudinary://926268379723749:0TF2m3YPZvPW9mWLwHZzgvTq1oU@dgplvci3g