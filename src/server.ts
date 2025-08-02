
import config from "./config/db"; 
import app from "./app";
import mongoose from "mongoose";


app.get("/",(req,res)=>{
    res.send({success:true,message:"i am here"});
});
app.listen(config.port,()=>{
    console.log(`🚀 Server running on port ${config.port}`);
});

async function server(){
    try {
        await mongoose.connect(config.database_url!)
        console.log("✅ Connected to database");

    } catch (error) {
         console.error(`❌ Server error:${server}`);
    }
}
    


server();

