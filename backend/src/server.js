import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT


//middleware
app.use(cors({
    origin:["http://localhost:5173"]
}))
app.use(express.json())
app.use(rateLimiter)
app.use((req,res,next)=>{
    console.log(`New Request: ${req.method} ${req.url}`)
    next()
})



app.use("/api/notes", notesRoutes);


connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started on port:",PORT);
    });
}); 


