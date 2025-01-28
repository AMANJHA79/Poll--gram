const express=require('express');
const {signup , login ,logout , verifyEmail , forgotPassword , resetPassword, createAdmin} = require('../controllers/authController');
const router=express.Router();
const authMiddleware = require("../middleware/authMiddleware");
// const adminMiddleware = require("../middleware/adminMiddleware");


router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.get('/verify-email/:token', verifyEmail);

router.post('/forgot-password',forgotPassword);

router.post('/reset-password/:token', resetPassword);

// Protected admin route to create new admin
router.post('/create-admin', authMiddleware, createAdmin);



module.exports = router;