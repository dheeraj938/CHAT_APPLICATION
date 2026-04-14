import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({});
const app = express();
const PORT = process.env.PORT || 8080;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
    origin: (origin, callback) => {
        // Allow any localhost origin for development
        if (!origin || origin.startsWith('http://localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOption));
console.log("CORS enabled for all localhost ports (development mode)");

// Debug middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

//code for deployment


// Debug 404
app.use((req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.path}`);
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, "0.0.0.0", () => {
    connectDB();
    console.log(`server listen at port ${PORT}`);  
})