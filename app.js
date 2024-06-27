import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import cors from "cors";

// Create an instance of the express framework
const app = express();

// extract out the creadentials from the env file
dotenv.config({ path: "./config/config.env" });

// set frontend with backend
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["POST"],
        credentials: true,
    })
);

// json -> string conversion
app.use(express.json());
// check for the data type
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/message", messageRouter);

// establish db connection
dbConnection();

export default app;