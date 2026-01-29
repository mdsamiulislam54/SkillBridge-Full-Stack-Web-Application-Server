import express, { Application } from "express";
import dotenv from 'dotenv'


import cors from 'cors'

dotenv.config();
const app:Application = express();
app.use(express.json())


app.use(cors({
    origin:process.env.BETTER_AUTH_URL || "http://localhost:5000",
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("SkillBridge Server is running");
});


export default app;