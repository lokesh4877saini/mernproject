const express = require('express');
const { getAllproducts,createProduct ,updateProduct,deleteProduct,getProductDetails, createProductReview, getProductReviews, deleteReviews, getAdminAllproducts} = require('../controllers/productController');
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/Auth')
const router = express.Router();
// isAuthenticatedUser => user is login ? 
router.route("/products").get(getAllproducts);
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminAllproducts);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route('/admin/product/:id')
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

router.route('/product/:id').get(getProductDetails);

// Reviews

router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,deleteReviews);

module.exports = router;