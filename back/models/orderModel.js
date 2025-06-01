const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        }
    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                // public_id:{
                //     type:String,
                //     required:true,
                // },
                // url:{
                //     type:String,
                //     required:true
                // }
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        paidAt: {
            type: Date,
            required: true,
        },
    },
    itemsPrice: {
        type: String,
        default: 0,
        required: true,
    },
    taxPrice: {
        type: String,
        default: 0,
        required: true,
    },
    shippingPrice: {
        type: String,
        default: 0,
        required: true,
    },
    totalPrice: {
        type: String,
        default: 0,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    createAt: {
        type: Date,
        default: Date.now(),
    }
})
module.exports = mongoose.model("orders", orderSchema);