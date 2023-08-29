import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import { Login, Register, getCurrentUser, getNumber, sendOtp } from './controllers/User.controller.js';
import { addProduct, addRating, allProducts, deleteYourProduct, getYourProducts, updateYourProduct } from './controllers/Product.controller.js';
import { checkSeller, isAdmin, isValidUser } from './Middlewares/All.Middlewares.js';
import { addCart, addWishlist, getCartProducts, getWishlistProducts } from './controllers/Buyer.controllers.js';
import { blockProduct, blockUser, unBlockUser, unblockProduct, verifyProduct } from './controllers/Admin.controllers.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json())
dotenv.config();
app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("Wporking...")
})

function checkJwt(req, res, next) {
    const fullToken = req.headers.authorization
    if (fullToken) {
        const token = fullToken.split(" ")[1];
        if (token) {
            try {
                // console.log(token, "token at middleware")
                const decoededData = jwt.verify(token, process.env.JWT_SECRET);

                const expTime = decoededData?.exp;
                const currentTimestamp = Math.floor(Date.now() / 1000);
                console.log(expTime, currentTimestamp, "expTime at middleware")
                if (currentTimestamp > expTime) {
                    return res.status(404).json({ success: false, message: "Session is over, Please login again." })
                }
                next();
            } catch (error) {
                console.log(error, "after error at exp")
                return res.status(500).json({ success: false, message: "Token is expired." })

            }
        }
        next();
    }
    next();
}

// all

app.post("/register", Register)

app.post("/login", Login)

app.post('/get-current-user', getCurrentUser)

app.get("/all-products", checkJwt, allProducts)

app.post("/get-number", getNumber)

app.post("/send-otp", sendOtp)

//buyer 

app.patch('/add-rating', isValidUser, addRating)
// app.patch('/add-comments',isValidUser, addComments) - assignemnt - {userId comment}
app.post("/add-wishlist", addWishlist)
app.get("/get-wishlist-products", getWishlistProducts)

app.post("/add-cart", addCart)
app.get("/get-cart-products", getCartProducts)

// app.delete("/remove-cart-product", removeCartProduct) , {productId, userId}

// sellers

app.post('/add-product', checkSeller, addProduct)
app.post("/get-your-products", checkSeller, getYourProducts)
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