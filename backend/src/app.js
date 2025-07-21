import express from "express";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js"
import requestRoutes from "./routes/requestRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import cors from "cors";
import fs from "fs"
import path from "path";
import config from "./config/config.js";

const app = express();
connectDB();


// Create uploads folder if doesn't exist
if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
}

// app middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors({
            origin: config.NODE_ENV === "production" ? "https://skill-swap-lpnt.vercel.app" : config.LOCAL_HOST,
            credentials: true
}))
app.use('/uploads', express.static(path.resolve('./uploads')));



// routes
app.use("/api/auth", authRoutes);
app.use("/api/request", requestRoutes)

app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);



// Global error handler
app.use(globalErrorHandler)



export default app;     