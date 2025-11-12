const User = require('../models/User');
const bcrypt = require('bcrypt');

// Controller function for user registration
const registerUser = async (req, res) => {
  try {
    const { name, password, email, bitcoinWallet, ethWallet, dogeAddress, refCode, isAdmin } = req.body;

    // Check if name already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.log('Email already exists');
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      bitcoinWallet,
      ethWallet,
      dogeAddress,
      refCode: refCode || '',
      isAdmin: isAdmin || false
    });

    const savedUser = await newUser.save();
    console.log('User registered successfully:', savedUser.name, 'ID:', savedUser._id);
    res.json({ message: 'Registration successful', user: { name: savedUser.name, id: savedUser._id } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  registerUser, 
};