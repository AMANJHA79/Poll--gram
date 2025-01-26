const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/jwtSecret');
const generateToken = require('../utils/generateToken');
const {transporter, sender} = require('../config/Email');
const getDeviceInfo = require('../utils/deviceDetector');
const sendLoginAlert = require('../utils/sendLoginAlert');

const signup = async (req,res)=>{
    const { username, email, password} = req.body;
    try {
        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide all fields'
            });
        }
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if(user){
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = generateToken();
        const verificationUrl = `${process.env.CLIENT_URL}/api/v1/auth/verify-email/${verificationToken}`;


        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpireAt: Date.now() + 10 * 60 * 1000 // 10 minutes
        });

        generateTokenAndSetCookie(res, newUser._id);

        // Send verification email
        const mailOptions = {
            from: sender,
            to: email,
            subject: 'Email Verification - Poll Gram',
            html: `
                <h1>Email Verification</h1>
                <p>Hello ${username},</p>
                <p> Click below to verify your email</p>
                <a href="${verificationUrl}">Verify Email</a>
                <p>This link will expire in 10 minutes.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            success: true,
            message: 'User created successfully. Please check your email for verification.',
            user: {
                username: newUser.username,
                email: newUser.email,
                _id: newUser._id
            }
        });

        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'error in signup controllers',
            error: error.message
        
        });
        
    }
}

const verifyEmail = async (req,res)=>{
    const { token } = req.params;
    try {
        const user = await User.findOne({ 
            verificationToken: token,
            verificationTokenExpireAt: { $gt: Date.now() }
        });
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid verification token or expired'
            });
        }
        user.verificationToken = '';
        user.verificationTokenExpireAt = null;
        user.isVerified = true;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email verified successfully'
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'error in verifyEmail controllers',
            error: error.message
        
        });
        
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email ||!password){
            return res.status(400).json({
                success: false,
                message: 'Please provide all fields'
            });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Get device info
        const deviceInfo = getDeviceInfo(req);

        // Send login notification
        await sendLoginAlert(user, deviceInfo);

        // Generate token and send response
        generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                username: user.username,
                email: user.email,
                _id: user._id
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in login controller',
            error: error.message
        });
    }
}

const logout = async (req,res)=>{
    res.send('Logout Route');
}



const forgotPassword = async (req,res)=>{
    res.send('Forgot Password Route');
}

const resetPassword = async (req,res)=>{
    res.send('Reset Password Route');
}




module.exports = {
    signup , login ,logout , verifyEmail , forgotPassword , resetPassword
}