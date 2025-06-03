const User = require('../models/userModel');
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require('../utils/ErrorHandler');
const JWT = require('jsonwebtoken');
exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please Login to access this resourse",401));
    }
    const decodedData = JWT.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decodedData.id);
    next();
})
exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next( new ErrorHandler(`Role :${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }
}