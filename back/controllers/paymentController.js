const catchAsyncErrors = require('../middleware/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecomm"
    }
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret
  });
});


exports.sendStripApiKey = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY
    })
})