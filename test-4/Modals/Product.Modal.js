import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    ratings: {
        type: [Number],
        enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
    },
    comments: {
        type: [Object] //[{ name: "RRocky", comment: "Good product" }, { name: "swaraj", comment: "Bad product" }]
    }
})

export default mongoose.model("Product", productSchema)