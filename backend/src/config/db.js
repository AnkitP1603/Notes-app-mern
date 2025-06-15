import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connected succesfully");
    } catch (error) {
        console.error("Error connecting to DB",error);
        process.exit(1);
    }
};