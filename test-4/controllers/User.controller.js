import UserModal from "../Modals/User.Modal.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { sendTwilioMessage } from './../helpers/Sms.js';

export const Register = async (req, res) => {
    try {
        const { userData } = req.body;
        const { name, email, password, role, number } = userData;
        if (!name || !email || !password || !role || !number) return res.json({ success: false, message: "All fields are mandtory.." })

        const isEmailExist = await UserModal.find({ email: email })
        if (isEmailExist.length) {
            return res.json({ success: false, message: "Email is exist, try diffrent email." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModal({ name, email, password: hashedPassword, role, number });

        await user.save();

        return res.json({ success: true, message: "User registered Successfully." })

    } catch (error) {
        return res.json({ success: false, message: error })
    }
}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body.userData;

        if (!email || !password) return res.json({ success: false, message: "All fields are mandtory.." })

        const user = await UserModal.findOne({ email })
        if (!user) return res.json({ success: false, message: "User not found.." })

        if (user.isBlocked) {
            return res.status(404).json({ success: false, message: "You are Blocked, Contact us." })
        }

        const isPasswordRight = await bcrypt.compare(password, user.password);
        // console.log(isPasswordRight, "isPasswordRight")
        if (isPasswordRight) {

            const userObeject = {
                name: user.name,
                email: user.email,
                _id: user._id,
                role: user.role
            }
            // console.log("Before ")
            const expiryTime = user?.role == "Seller" ? "4h" : "1h";
            // console.log(expiryTime, "expiryTime")
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: expiryTime })
            // console.log(token, "token her")
            return res.json({ success: true, message: "Login Successfull.", user: userObeject, token: token })
        }
        return res.json({ success: false, message: "Password is wrong." })
    } catch (error) {
        return res.json({ success: false, message: error })
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is required!" })

        const decoededData = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoededData, "decoededData")
        if (!decoededData) {
            return res.status(404).json({ success: false, message: "Not valid json token.." })
        }
        // return res.send(decoededData)
        const userId = decoededData?.userId

        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found.." })
        }

        const userObeject = {
            name: user?.name,
            email: user?.email,
            _id: user?._id,
            role: user?.role
        }

        return res.status(200).json({ success: true, user: userObeject })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getNumber = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.json({ success: false, message: "User Id is mandtory.." })

        const userNumber = await UserModal.findById(userId).select("number isNumberVerified");
        if (userNumber) {
            return res.json({ success: true, number: userNumber.number, isNumberVerified: userNumber.isNumberVerified })
        }
        return res.json({ success: false, message: "Internal error try again.." })

    } catch (error) {
        return res.json({ success: false, message: error })
    }
}

export const sendOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.json({ success: false, message: "User Id is mandtory.." })

        const userNumber = await UserModal.findById(userId);

        const otp = "987676" // use nanoid or uuid
        const message = `Hi, Your Awdiz mobile verification otp is - ${otp}`
        if (userNumber) {

            const responseFromTwilio = sendTwilioMessage(userNumber.number, message)
            console.log(responseFromTwilio, "responseFromTwilio")
            if (responseFromTwilio) {
                userNumber.otpForNumberVerification = otp;
                await userNumber.save()
                return res.json({ success: true, message: "Otp sent to your number." })
            }
        }
        return res.json({ success: false, message: "User not foudn.." })

    } catch (error) {
        return res.json({ success: false, message: error })
    }
}