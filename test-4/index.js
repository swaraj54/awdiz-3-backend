import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Login, Register, getCurrentUser } from './controllers/User.controller.js';
import { addProduct, allProducts, deleteYourProduct, getYourProducts, updateYourProduct } from './controllers/Product.controller.js';
import { checkSeller } from './Middlewares/Seller.Middleware.js';
import { addCart, getCartProducts } from './controllers/Buyer.controllers.js';

const app = express();
app.use(express.json())
dotenv.config();


app.get("/", (req, res) => {
    res.send("Wporking...")
})

// all

app.post("/register", Register)

app.post("/login", Login)

app.post('/get-current-user', getCurrentUser)

app.get("/all-products", allProducts)

//buyer 


// app.post("/add-wishlist", addWishlist)
// app.get("/get-wishlist-products", getWishlistProducts)

app.post("/add-cart", addCart)
app.get("/get-cart-products", getCartProducts)

// app.delete("/remove-cart-product", removeCartProduct) , {productId, userId}

// sellers

app.post('/add-product', checkSeller, addProduct)
app.get("/get-your-products", checkSeller, getYourProducts)
app.patch("/update-your-product", checkSeller, updateYourProduct)
app.delete("/delete-your-product", checkSeller, deleteYourProduct)



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB...")
})

app.listen(8002, () => {
    console.log("Listening on port 8002")
})