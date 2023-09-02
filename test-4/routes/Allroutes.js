import express from 'express';
import { Login, Register, getCurrentUser, getNumber, sendOtp } from '../controllers/User.controller.js';
import { addCart, allCartProducts, allProducts, getSingleProductData } from '../controllers/Product.controller.js';

const router = express.Router();


router.post("/register", Register)

router.post("/login", Login)

router.post('/get-current-user', getCurrentUser)

router.get("/all-products", allProducts)

router.post("/get-number", getNumber)

router.post("/send-otp", sendOtp)

router.post("/get-single-product-data", getSingleProductData)

router.post('/add-cart', addCart)

router.post('/all-cart-products', allCartProducts)

export default router;
