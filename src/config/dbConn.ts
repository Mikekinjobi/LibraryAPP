const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        if(process.env.DATABASE_URI === undefined) return console.log('undefined process.env') 
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err){
        console.error(err)
    }
}

module.exports = connectDB;