const app = require('./app');
require('dotenv').config({path:"back/config/config.env"})
const connection = require('./config/db');
const PORT = process.env.PORT ;
// connecting with database
connection();

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