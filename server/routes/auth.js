const express = require('express');
const User = require('../models/User');
const jwt = require("jsonwebtoken")
const router = express.Router();

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
        // check if email already registered or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists please try with different email id"
            })
        }
        // password hashing 
        const hasedPassword = await bcrypt.hash(password, 10);
        //save in db
        const user = new User({
            name,
            email,
            password: hasedPassword
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
