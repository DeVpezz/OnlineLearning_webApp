import express from 'express';
import connectDB from './database/db.js'; 
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js'
import cors from "cors"
dotenv.config({});

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Specify your frontend URL here
    credentials:true
}))

const PORT=process.env.PORT || 5000;

//api
app.use("/api/v1/user", userRoute); 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
