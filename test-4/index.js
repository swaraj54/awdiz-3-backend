import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Login, Register, getCurrentUser } from './controllers/User.controller.js';
import { addProduct, allProducts, getYourProducts, updateYourProduct } from './controllers/Product.controller.js';
import { checkSeller } from './Middlewares/Seller.Middleware.js';

const app = express();
app.use(express.json())
dotenv.config();


app.get("/", (req, res) => {
    res.send("Wporking...")
})

app.post("/register", Register)

app.post("/login", Login)

app.post('/get-current-user', getCurrentUser)

app.post('/add-product', checkSeller, addProduct)

app.get("/all-products", allProducts)

app.get("/get-your-products", checkSeller, getYourProducts)

app.patch("/update-your-product",checkSeller, updateYourProduct )



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB...")
})

app.listen(8002, () => {
    console.log("Listening on port 8002")
})