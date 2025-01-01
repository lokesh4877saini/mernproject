const express = require('express');
const { newOrder, getSignleOrder, myOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/Auth')
const router = express.Router();
// isAuthenticatedUser => user is login ? 
router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,getSignleOrder);
router.route("/orders/me").get(isAuthenticatedUser,myOrder);
router.route('/admin/orders/').get(isAuthenticatedUser,authorizeRoles('admin'),getAllOrders)
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateOrderStatus).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder)
module.exports = router;