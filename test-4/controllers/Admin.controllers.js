import ProductModal from "../Modals/Product.Modal.js";
import UserModal from "../Modals/User.Modal.js";

export const blockUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModal.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });

        if (user) {
            return res.status(200).json({ success: true, message: "User bloacked Successfully", user: user })
        }
        throw new Error("Internal Error, Please try again.")

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const unBlockUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModal.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });

        if (user) {
            return res.status(200).json({ success: true, message: "User unbloacked Successfully.", user: user })
        }
        throw new Error("Internal Error, Please try again.")

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const blockProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await ProductModal.findByIdAndUpdate(productId, { isBlocked: true }, { new: true })

        if (product) {
            return res.status(200).json({ success: true, message: "Product blocked Successfully", product: product })
        }

        throw new Error("Internal Error, Please try again.")

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const unblockProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await ProductModal.findByIdAndUpdate(productId, { isBlocked: false }, { new: true })

        if (product) {
            return res.status(200).json({ success: true, message: "Product unblocked Successfully", product: product })
        }

        throw new Error("Internal Error, Please try again.")

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const verifyProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await ProductModal.findByIdAndUpdate(productId, { isVerified: true }, { new: true })

        if (product) {
            return res.status(200).json({ success: true, message: "Product Successfully verified", product: product })
        }
        throw new Error("Internal Error, Please try again.")

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}