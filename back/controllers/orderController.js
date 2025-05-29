const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    const order = await Order.create({
        shippingInfo,
        shippingPrice,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        paymentInfo: {
            ...paymentInfo,
            paidAt: Date.now()
        },
        totalPrice,
        user: req.user._id,
    });
    res.status(201).json({
        success: true,
        order,
    })
})
// get Single Order
exports.getSignleOrder = catchAsyncErrors(async (req, res, next) => {
    // const order = await Order.findById(req.params.id).populate("user","name email");
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }
    res.status(201).json({
        success: true,
        order,
    })
})
// get logged in user Order
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json({
        success: true,
        orders,
    })
})
// get orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find() 
    let totalAmount = 0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    });
    res.status(200).json({
        success: true,totalAmount,
        orders,
    })
})
// update Order Status -- Admin
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400));
    }
    order.orderItems.forEach(async (pre)=>{
        await updateStock(pre.product,pre.quantity)
    })
    order.orderStatus = req.body.status;
    if(req.body.status= "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        msg:"Order Update Successfully"
    })
})
// deleteOrder -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("order doesn't exists",400));
    }
    await order.deleteOne();
    res.status(200).json({
        success: true,
        msg:"order delete successfully"
    })
})



async function updateStock(id,quantity){
    const product=  await Product.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
}