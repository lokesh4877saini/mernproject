const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser} = require('../controllers/userController');
const {isAuthenticatedUser,authorizeRoles}  = require('../middleware/Auth');
router.route('/register').post(registerUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser,getUserDetails);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/me/update').put(isAuthenticatedUser,updateProfile)

// All User(Admin)
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUser)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getSingleUser).put(isAuthenticatedUser,authorizeRoles('admin'),updateUserRole).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)
module.exports = router;