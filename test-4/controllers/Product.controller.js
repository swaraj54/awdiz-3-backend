
import ProductModal from "../Modals/Product.Modal.js";
import jwt from 'jsonwebtoken';
import UserModal from "../Modals/User.Modal.js";

export const addProduct = async (req, res) => {
    try {
        const { name, price, image, category } = req.body.productData;
        const { token } = req.body;
        if (!name || !price || !image || !category || !token) return res.status(404).json({ success: false, message: "All fields are mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const product = new ProductModal({ name, price, image, category, userId: userId });
        await product.save();

        return res.status(201).json({ success: true, message: "Product Created Successfully." })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const allProducts = async (req, res) => {
    try {
        // console.log(req.headers.authorization, "headers")
        // const fullToken = req.headers.authorization
        // console.log(fullToken, "- fullToken")
        // const token = fullToken.split(" ")[1]
        // console.log(token, "- token here")
        // const products = await ProductModal.find({ isBlocked: false, isVerified: true });
        const products = await ProductModal.find({});
        // console.log(products, "products")
        if (products.length) {
            return res.status(200).json({ success: true, products: products })
        }
        return res.status(404).json({ success: false, message: "No products found" })

    } catch (error) {
        console.log(error, "error in all product")
        return res.status(500).json({ success: false, error: error.message })
    }
}


export const getYourProducts = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const yourProducts = await ProductModal.find({ userId: userId })

        if (yourProducts.length) {
            return res.status(200).json({ success: true, products: yourProducts })
        }

        return res.status(404).json({ success: false, message: "No products found." })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const updateYourProduct = async (req, res) => {
    try {
        const { productId, name, image, price, category, token } = req.body;
        if (!token) return res.status(404).json({ status: "error", message: "Token is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const updatedProduct = await ProductModal.findOneAndUpdate({ _id: productId, userId: userId }, { name, image, price, category }, { new: true })

        if (updatedProduct) {
            return res.status(200).json({ status: "Sucess", product: updatedProduct })
        }
        return res.status(404).json({ status: "error", message: "You are trying to update product which is not yours.." })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const deleteYourProduct = async (req, res) => {
    try {
        const { productId, token } = req.body;

        if (!productId) return res.status(404).json({ status: "error", message: "Product id is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData.userId;

        const isDeleted = await ProductModal.findOneAndDelete({ _id: productId, userId: userId })
        if (isDeleted) {
            return res.status(200).json({ success: true, message: "Product Deleted Successfully." })
        }

        throw new Error("Mongodb error")

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}


export const addRating = async (req, res) => {
    try {
        const { productId, rating } = req.body;

        const updatedProductRating = await ProductModal.findByIdAndUpdate(productId, { $push: { ratings: rating } }, { new: true })

        if (updateYourProduct) {
            return res.status(200).json({ success: true, message: "Rating added Successfully", product: updatedProductRating })
        }
        throw new Error("Mongodb error")
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}


export const getSingleProductData = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) return res.status(404).json({ success: false, message: "Product id is mandtory.." })

        const product = await ProductModal.findById(productId);
        if (product) {
            return res.status(200).json({ success: true, product })
        }
        return res.status(404).json({ success: false, error: "Products details not found." })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}



export const addCart = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        if (!productId) return res.status(404).json({ success: false, message: "Product id is mandtory.." })
        if (!userId) return res.status(404).json({ success: false, message: "Usur id is mandtory.." })


        const user = await UserModal.findByIdAndUpdate(userId, { $push: { cart: productId } })
        if (!user) return res.status(404).json({ success: false, message: "User not found.." })


        return res.status(200).json({ success: true })

    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const allCartProducts = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(404).json({ success: false, message: "Usur id is mandtory.." })


        const user = await UserModal.findById(userId)
        if (!user) return res.status(404).json({ success: false, message: "User not found.." })
        var finalData = [];
        var array = user?.cart;
        for (var i = 0; i < array?.length; i++) {
            const productData = await ProductModal.findById(array[i])
            if (productData) {
                finalData.push(productData)
            }
        }
        return res.status(200).json({ success: true, cartProducts: finalData })

    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({ success: false, error: error.message })
    }
}