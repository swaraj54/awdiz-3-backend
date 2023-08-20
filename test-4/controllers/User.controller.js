import UserModal from "../Modals/User.Modal.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) return res.json({ status: "error", message: "All fields are mandtory.." })

        const isEmailExist = await UserModal.find({ email: email })
        if (isEmailExist.length) {
            return res.json({ status: "error", message: "Email is exist, try diffrent email." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModal({ name, email, password: hashedPassword, role });

        await user.save();

        return res.json({ status: "Success", message: "User registered Successfully." })

    } catch (error) {
        return res.json({ status: "error", message: error })
    }
}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.json({ status: "error", message: "All fields are mandtory.." })

        const user = await UserModal.findOne({ email })
        if (!user) return res.json({ status: "error", message: "User not found.." })

        if (user.isBlocked) {
            return res.status(404).json({ success: false, message: "You are Blocked, Contact us." })
        }

        const isPasswordRight = await bcrypt.compare(password, user.password);
        // console.log(isPasswordRight, "isPasswordRight")
        if (isPasswordRight) {

            const userObeject = {
                name: user.name,
                email: user.email,
                _id: user._id
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
            // console.log(token, "token her")
            return res.json({ status: "Success", message: "Login Successfull.", user: userObeject, token: token })
        }
        return res.json({ status: "error", message: "Password is wrong." })
    } catch (error) {
        return res.json({ status: "error", message: error })
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ status: "error", message: "Token is required!" })

        const decoededData = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoededData, "decoededData")
        if (!decoededData) {
            return res.status(404).json({ status: "error", message: "Not valid json token.." })
        }
        // return res.send(decoededData)
        const userId = decoededData?.userId

        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found.." })
        }

        const userObeject = {
            name: user?.name,
            email: user?.email,
            _id: user?._id
        }

        return res.status(200).json({ status: "Success", user: userObeject })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}