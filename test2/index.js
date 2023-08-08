import express from 'express';
import { Login, Register } from './controllers/User.controller.js';
import mongoose from 'mongoose';

const app = express();


// req - frontend sends some data to backend
// res - backend sends data back to frontend
app.get("/", function (req, res) {
    res.send("Working...")
})

app.get("/login", Login)
// app.get("/login", function (req, res) {
//     res.send("Login")
// })

app.get("/register", Register)
// app.get("/register", function (req, res) {
//     res.send("Register")
// })

mongoose.connect("mongodb+srv://rocky:rocky123@cluster0.6yd9l.mongodb.net/AWDIZ3").then(() => {
    console.log("Connected to db.")
}).catch((error) => {
    console.log("Error while connecting mongodb", error)
})

app.listen(8000, () => {
    console.log("Server running on port 8000")
})