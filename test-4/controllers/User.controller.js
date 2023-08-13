import UserModal from "../Modals/User.Modal.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.json({ status: "error", message: "All fields are mandtory.." })

        const isEmailExist = await UserModal.find({ email: email })
        if (isEmailExist.length) {
            return res.json({ status: "error", message: "Email is exist, try diffrent email." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModal({ name, email, password: hashedPassword });

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


// export const getCurrentUser = (req, res) => {
//     try {
//         const { token } = req.body;

//     } catch (error) {
//         return res.json({ status: "error", message: error })
//     }
// }