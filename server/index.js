import express from 'express'; 
import connectDB from './database/db.js'; 
import dotenv from 'dotenv';

dotenv.config({});

connectDB();
const app = express();
const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
