import express from 'express';
import { blockProduct, blockUser, unBlockUser, unblockProduct, verifyProduct } from '../controllers/Admin.controllers.js';
import { isAdmin } from '../Middlewares/All.Middlewares.js';

const router = express.Router();


// router.get('/get-all-buyers', isAdmin, getAllBuyers) // UserModel.find({role : "Buyer"}) - assignemnt
// router.get('/get-all-sellers', isAdmin, getAllSellers)// UserModel.find({role : "Seller"}) - assignemnt
// router.get("/get-all-products", isAdmin, getAllProducts) // ProductModel.find({}) - assignemnt
router.patch("/block-user", isAdmin, blockUser)
router.patch("/unblock-user", isAdmin, unBlockUser)
router.patch("/block-product", isAdmin, blockProduct)
router.patch("/un-block-product", isAdmin, unblockProduct)
router.patch("/verify-product", isAdmin, verifyProduct)
// router.patch("/get-verify-product", isAdmin, getverifiedProducts) - assignemnt
// router.patch("/get-un-verify-product", isAdmin, getUnVerifiedProducts) - assignemnt
// router.patch("/get-blocked-product", isAdmin, getBlockedProducts) - assignemnt

export default router;