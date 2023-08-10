import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './Modals/User.modal.js'

const app = express();
dotenv.config();
app.use(express.json());

// CRUD - CREATE READ  UPDATE   DELETE
// METHODS  POST GET  PATCH/PUT DELETE

app.get("/", function (req, res) {
    res.send("Working...")
})

app.post('/login', function (req, res) {
    res.send("Hello from Login function..")
})

app.post('/register', async function (req, res) {
    console.log(req.body, "req.body")
    const { name, surname, age, email, number, password, confirmPassword } = req.body;
    if (!name) return res.send("Name is missing..");
    if (!surname) return res.send("Surname is missing..")
    if (!age) return res.send("Age is missing..")
    if (!email) return res.send("Email is required.")
    if (!number) return res.send("Number is required");
    if (!password) return res.send("Password is required");
    if (!confirmPassword) return res.send("Confirm password is required!")
    if (password !== confirmPassword) return res.send("Password and Confirm password not matched.")

    console.log(typeof (age), typeof (number), "data types")

    const user = new User({
        name: name,
        surname: surname,
        age: parseInt(age),
        email,
        number: parseInt(number),
        password
    })

    // console.log(user,"user")

    await user.save()

    res.send("Registeration Done..")

})

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB..")
})

app.listen(8000, () => {
    console.log("Listening on port 8000");
})