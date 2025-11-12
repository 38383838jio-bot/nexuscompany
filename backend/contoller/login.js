const User = require('../models/User');
const bcrypt = require('bcrypt');

// Controller function for user login
const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find user by name
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Return user data (excluding password)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      bitcoinWallet: user.bitcoinWallet,
      ethWallet: user.ethWallet,
      dogeAddress: user.dogeAddress,
      refCode: user.refCode,
      balance: user.balance,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    };

    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginUser
};
