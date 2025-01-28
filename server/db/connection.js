const mongoose = require("mongoose");


const connection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    }catch(err){
      console.log(err)
    }
}
module.exports = connection;