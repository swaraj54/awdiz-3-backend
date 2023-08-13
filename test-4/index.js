import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Login, Register } from './controllers/User.controller.js';

const app = express();
app.use(express.json())
dotenv.config();


app.get("/", (req, res) => {
    res.send("Wporking...")
})

app.post("/register", Register)

app.post("/login", Login)



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB...")
})

app.listen(3001, () => {
    console.log("Listening on port 8002")
})