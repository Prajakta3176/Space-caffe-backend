import mongoose from "mongoose";


const conn = async()=>{
    try{
        await mongoose.connect(`${process.env.URI}`).then(()=>{
            console.log("Database connected");
        });
    }catch{
        console.log("Database not connected");
    }
}


export default conn;