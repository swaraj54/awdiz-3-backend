import ProductModal from "../Modals/Product.Modal.js";
import UserModal from "../Modals/User.Modal.js";
import jwt from 'jsonwebtoken';

export const addCart = async (req, res) => {
    try {
        const { token, productId } = req.body;
        if (!token || !productId) throw new Error("Token and Product id is required.")

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await UserModal.findById({ _id: userId })

        user?.cart.push(productId);

        await user.save();

        return res.status(200).json({ success: true, user: user })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}

export const getCartProducts = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await UserModal.findById(userId)


        if (user) {
            var finalData = [];
            for (var i = 0; i < user.cart.length; i++) {
                // console.log(user.cart[i])
                const product = await ProductModal.findById(user.cart[i])
                if (product) {
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, products: finalData })
        }
        throw new Error("User not found.")

    } catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}
export const addWishlist = async (req, res) => {
    try {
        const { token, productId } = req.body;
        if (!token || !productId) throw new Error("Token and Product id is required.")

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await UserModal.findById({ _id: userId })

        user?.wishlist.push(productId);

        await user.save();

        return res.status(200).json({ success: true, user: user })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}

export const getWishlistProducts = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await UserModal.findById(userId)


        if (user) {
            var finalData = [];
            for (var i = 0; i < user.wishlist.length; i++) {
                // console.log(user.cart[i])
                const product = await ProductModal.findById(user.wishlist[i])
                if (product) {
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, products: finalData })
        }
        throw new Error("User not found.")

    } catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}