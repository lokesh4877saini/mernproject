const mongoose = require('mongoose');
const connection = () =>{
    mongoose.connect(process.env.db_URL).then(data =>{
        console.log("Database Connected",data.connection.host)
    })
}
module.exports = connection;