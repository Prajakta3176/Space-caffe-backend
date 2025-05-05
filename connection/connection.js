import mongoose from "mongoose";


const conn = async()=>{
    try{
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log("Database connected");
       
    }catch{
        console.log("Database not connected");
    }
}


export default conn;