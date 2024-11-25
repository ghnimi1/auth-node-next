const User = require("../models/User");

const register = async (req, res) => {
    const { email, password } = req.body;
// Create a new user
    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
        
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

module.exports = { register };
