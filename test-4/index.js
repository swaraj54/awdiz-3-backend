import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Login, Register, getCurrentUser } from './controllers/User.controller.js';
import { addProduct, addRating, allProducts, deleteYourProduct, getYourProducts, updateYourProduct } from './controllers/Product.controller.js';
import { checkSeller, isAdmin, isValidUser } from './Middlewares/All.Middlewares.js';
import { addCart, addWishlist, getCartProducts, getWishlistProducts } from './controllers/Buyer.controllers.js';
import { blockProduct, blockUser, unBlockUser, unblockProduct, verifyProduct } from './controllers/Admin.controllers.js';

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

app.patch('/add-rating',isValidUser, addRating)
// app.patch('/add-comments',isValidUser, addComments) - assignemnt - {userId comment}
app.post("/add-wishlist", addWishlist)
app.get("/get-wishlist-products", getWishlistProducts)

app.post("/add-cart", addCart)
app.get("/get-cart-products", getCartProducts)

// app.delete("/remove-cart-product", removeCartProduct) , {productId, userId}

// sellers

app.post('/add-product', checkSeller, addProduct)
app.get("/get-your-products", checkSeller, getYourProducts)
app.patch("/update-your-product", checkSeller, updateYourProduct)
app.delete("/delete-your-product", checkSeller, deleteYourProduct)

// admin
// app.get('/get-all-buyers', isAdmin, getAllBuyers) // UserModel.find({role : "Buyer"}) - assignemnt
// app.get('/get-all-sellers', isAdmin, getAllSellers)// UserModel.find({role : "Seller"}) - assignemnt
// app.get("/get-all-products", isAdmin, getAllProducts) // ProductModel.find({}) - assignemnt
app.patch("/block-user", isAdmin, blockUser)
app.patch("/unblock-user", isAdmin, unBlockUser)
app.patch("/block-product", isAdmin, blockProduct)
app.patch("/un-block-product", isAdmin, unblockProduct)
app.patch("/verify-product", isAdmin, verifyProduct)
// app.patch("/get-verify-product", isAdmin, getverifiedProducts) - assignemnt
// app.patch("/get-un-verify-product", isAdmin, getUnVerifiedProducts) - assignemnt
// app.patch("/get-blocked-product", isAdmin, getBlockedProducts) - assignemnt


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB...")
})

app.listen(8002, () => {
    console.log("Listening on port 8002")
})