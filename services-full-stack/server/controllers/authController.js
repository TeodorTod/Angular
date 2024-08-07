const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are mandatory!' });
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        return res.status(400).json({ message: 'This email is already taken!' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        console.log(user);
        return res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to register!" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory!" });
    }

    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

            const token = jwt.sign({
                id: user.id,
                isAdmin: false
            },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '24h'
            });

            res.cookie("token", token, {
                httpOnly: true,
                // secure: true, // Uncomment this if you're using HTTPS
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            });

            return res.status(200).json({ accessToken, user: user});
        } else {
            return res.status(401).json({ message: 'Email or password does not match!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to login!" });
    }
};
const currentUser = async (req, res) => {
    try {
        return res.status(200).json({ message: "Current user details!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to get current user!" });
    }
};

const updateUser = async (req, res) => {
    const { username, email, password, newPassword } = req.body;

    try {
        const user = await User.findById(req.user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check current password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Update user information
        user.username = username || user.username;
        user.email = email || user.email;
        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await user.save();

        const token = jwt.sign(
            { user: { username: updatedUser.username, email: updatedUser.email, id: updatedUser._id } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ accessToken: token, user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
};

const logoutUser = async (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout successfull" });
};

module.exports = { registerUser, loginUser, currentUser, updateUser,  logoutUser };
