
import ProductModal from "../Modals/Product.Modal.js";

export const addProduct = async (req, res) => {
    try {
        const { name, price, image, category, token } = req.body;
        if (!name || !price || !image || !category || !token) return res.status(404).json({ status: "error", message: "All fields are mandtory.." })

        const product = new ProductModal({ name, price, image, category });
        await product.save();

        return res.status(201).json({ status: "Sucess" })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}