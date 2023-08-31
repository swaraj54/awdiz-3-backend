import express from 'express';
import { addRating } from '../controllers/Product.controller.js';
import { isValidUser } from '../Middlewares/All.Middlewares.js';
import { addCart, addWishlist, getCartProducts, getWishlistProducts } from '../controllers/Buyer.controllers.js';

const router = express.Router();


router.patch('/add-rating', isValidUser, addRating)
// router.patch('/add-comments',isValidUser, addComments) - assignemnt - {userId comment}
router.post("/add-wishlist", addWishlist)
router.get("/get-wishlist-products", getWishlistProducts)

router.post("/add-cart", addCart)
router.get("/get-cart-products", getCartProducts)


// router.delete("/remove-cart-product", removeCartProduct) , {productId, userId}


export default router;