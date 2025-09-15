const express = require('express');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();


//registration route
router.post("/register", async (req, res) => {
    try {
        //first we will get the data from the request
        const { name, email, password, confirmPassword } = req.body;
        //data validation 
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "all the fields are required"
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        // check if email already registered or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists please try with different email id"
            })
        }
        // password hashing 
        const hashedPassword  = await bcrypt.hash(password, 10);
        //save in db
        const user = new User({
            name,
            email,
            password: hashedPassword 
        })

        await user.save();

        //generate token
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1d' })

        return res.status(200).json({
            success: true,
            message: "user created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token

        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
})

router.post('/login', async (req, res) => {
    try {
        //get data
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }
        // user exists or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user does not exists"
            })
        }
        // password check 
        const checkedPassword = await bcrypt.compare(password, user.password);
        if (!checkedPassword) {
            return res.status(400).json({
                success: false,
                message: "password does not match please try again"
            })
        }
        // json token
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
})

module.exports = router;