const express = require('express');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const router = new express.Router();
const User = require('../models/user.js');



router.route('/signup').post(async (req, res) => {
    try {
        const existingUser = await User.find({ email: req.body.email });

        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        // Assuming you have a plaintext password in req.body.password
        const plaintextPassword = req.body.password;

        // Hash the password before saving it
        const saltRounds = 10;
        const hash = await bcrypt.hash(plaintextPassword, saltRounds);

        const user = new User({
            email: req.body.email,
            password: hash,
            name:req.body.name
        });

        await user.save();

        console.log(user);
        return res.status(201).json({
            message: "User signed up successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
});


//////////////////////////////creating a login route for a user//////////////////////////////////////////

router.route('/login').post(async (req, res) => {
    try {
        const users = await User.find({ email: req.body.email });

        if (users.length < 1) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }

        const result = await bcrypt.compare(req.body.password, users[0].password);

        if (result) {
            const token = jwt.sign(
                {
                    email: users[0].email,
                    userId: users[0]._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "10d"
                }
            );

            return res.status(200).json({
                message: "Authentication successful",
                token: token
            });
        } else {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
