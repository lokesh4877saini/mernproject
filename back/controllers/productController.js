const mongoose = require('mongoose');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apifeatures');

// create Product     ---> admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
   req.body.user = req.user.id;
   const product = await Product.create(req.body);
   res.status(201).json({
      success: true,
      product
   })

});
// update Product 
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

   // Find the product by ID
   let product = await Product.findById(req.params.id);

   // If the product is not found, send a 404 response
   if (!product) {
      return res.status(404).json({
         success: false,
         msg: "Product not found when updating by ID",
      });
   }

   // Update the product
   product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         new: true,        // Returns the updated document
         runValidators: true, // Ensures validators are applied
         useFindAndModify: false, // Prevents deprecation warning
      }
   );

   // Send the updated product in the response
   return res.status(200).json({
      success: true,
      msg: "Product updated successfully",
      product,
   });
});
// delete

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

   // Find the product by ID
   let product = await Product.findById(req.params.id);

   // If the product is not found, send a 404 response
   if (!product) {
      return next(new ErrorHandler("Product is not found", 404))
   }

   // Delete the product
   product = await Product.findByIdAndDelete(
      req.params.id,
   );

   // Send the updated product in the response
   return res.status(200).json({
      success: true,
      msg: "Product Delete successfully",
      product,
   });

});
// get all product
exports.getAllproducts = catchAsyncErrors(async (req, res,next) => {
   // test => // return next(new ErrorHandler("This is my temp error",500))
   const resultPerPage = 8;
   const productCount = await Product.countDocuments();  // -- product count for admin dashboard
   // console.log(productCount)
   const apifeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
   const products = await apifeature.query;
   res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage
   })
})

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
   // const productId = req.params.id; // Your problematic ID
   // if (!mongoose.Types.ObjectId.isValid(productId)) {
   //    return next(new ErrorHandler("Product is not found", 404))
   // }
   // Find the product by ID
   let product = await Product.findById(req.params.id);
   // If the product is not found, send a 404 response
   if (!product) {
      return next(new ErrorHandler("Product is not found", 404))
   }
   // Send the product in the response
   return res.status(200).json({
      success: true,
      msg: "Product found successfully",
      product,
   });

});


// Create New Review and Update the Review
exports.createProductReview = catchAsyncErrors(
   async (req, res, next) => {
      const { rating, comment, productId } = req.body;
      const review = {
         user: req.user._id,
         name: req.user.name,
         rating: Number(rating),
         comment:comment,
      }
      const product = await Product.findById(productId);

      // old review user id => rev.user.toString()        toString=> when an object needs to be used as a string. 
      const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
      if (isReviewed) {
         product.reviews.forEach(rev => {
            if (rev => rev.user.toString() === req.user._id.toString())
               (rev.rating = rating),
                  (rev.comment = comment)
         })
      } else {
         await product.reviews.push(review);
         // numOfReviews  ->number of reviews
         product.numOfReviews = product.reviews.length;
      }
      // 4,5, 5, 2=> 4
      // 16/4 => 4
      let avg = 0;
      product.reviews.forEach((rev) => {
         avg += rev.rating
      })
      product.ratings = avg / product.reviews.length;
      await product.save({ validateBeforeSave: false })
      res.status(200).json({
         success: true,
      })
   }

)

// Get All Reviews of a Product
exports.getProductReviews = catchAsyncErrors(
   async (req, res, next) => {
      const product = await Product.findById(req.query.id);
      // If the product is not found, send a 404 response
      if (!product) {
         return next(new ErrorHandler("Product is not found", 404))
      }
      // Send the product in the response
      return res.status(200).json({
         success: true,
         msg: "Product found successfully",
         reviews: product.reviews,
      });
   }
)
// Delete Review
exports.deleteReviews = catchAsyncErrors(
   async (req, res, next) => {
      const product = await Product.findById(req.query.productId);
      // If the product is not found, send a 404 response
      if (!product) {
         return next(new ErrorHandler("Product is not found", 404))
      }
      const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
      let avg = 0;
      reviews.forEach((rev) => {
         avg += rev.rating
      })
      ratings = avg / reviews.length;
      const numOfReviews = reviews.length;
      await Product.findByIdAndUpdate(req.query.productId,{
         reviews,ratings,numOfReviews,
      })
      // Send the product in the response
      return res.status(200).json({
         success: true,
      });
   }
)