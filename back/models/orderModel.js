const mongoose = require('mongoose');
// const schema=  new schema({
//     name:{
//         type:String,
//         require:true
//     }
// });
// schema.path('name').isRequired;
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
            type: Number,
            required: true,
        },
        phoneNo: {
            type: Number,
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
                type: String,
                required: true,
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                requried: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        requried: true,
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
            require: true,
        },
    },
    itemsPrice: {
        type: Number,
        default: 0,
        require: true,
    },
    texPrice: {
        type: Number,
        default: 0,
        require: true,
    },
    shippingPrice: {
        type: Number,
        default: 0,
        require: true,
    },
    totalPrice: {
        type: Number,
        default: 0,
        require: true,
    },
    orderStatus: {
        type: String,
        required: String,
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