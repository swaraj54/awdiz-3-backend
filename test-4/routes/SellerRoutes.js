import express from 'express';
import { addProduct, deleteYourProduct, getYourProducts, updateYourProduct } from '../controllers/Product.controller.js';
import { checkSeller } from '../Middlewares/All.Middlewares.js';

const router = express.Router();

router.post('/add-product', checkSeller, addProduct)
router.post("/get-your-products", checkSeller, getYourProducts)
router.patch("/update-your-product", checkSeller, updateYourProduct)
router.delete("/delete-your-product", checkSeller, deleteYourProduct)

export default router;