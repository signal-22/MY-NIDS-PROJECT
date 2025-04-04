const express = require('express');
const User = require('../models/user'); // Ensure this path is correct
const router = express.Router();

// POST /api/users - Register a new user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists' });
        }

        // Create a new user
        const newUser  = new User({ username, email, password });
        await newUser .save();

        // Respond with the created user (excluding the password)
        res.status(201).json({
            message: 'User  created successfully',
            user: {
                id: newUser ._id,
                username: newUser .username,
                email: newUser .email,
            },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;