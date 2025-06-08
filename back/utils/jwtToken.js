// Create Token and Saving in cookie
const sendToken = (user,statusCode,res)=>{
    const token  = user.generateJWT();
    // options for cookie
    const options = {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"none", 
        // sameSite:"lax",
        maxAge:new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000),
    }
    res.cookie("token",token,options).status(statusCode).json({
        success:true,
        user,
        token,
    })
}
module.exports =sendToken;