const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Mongodb is connected successfully"))
.catch(err=>{
    console.log(err.message);
    process.exit(1);
})