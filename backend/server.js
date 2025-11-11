require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World from Investment Backend');
});

// API routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    // Validate required fields
    const { name, password, email, bitcoinWallet, ethWallet, dogeAddress } = req.body;

    if (!name || !password || !email || !bitcoinWallet || !ethWallet || !dogeAddress) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if user already exists by name or email
    const existingUser = await User.findOne({
      $or: [
        { name: name },
        { email: email }
      ]
    });

    if (existingUser) {
      if (existingUser.name === name) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Create new user
    const user = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      bitcoinWallet: req.body.bitcoinWallet,
      ethWallet: req.body.ethWallet,
      dogeAddress: req.body.dogeAddress,
      refCode: req.body.refCode || '',
      isAdmin: req.body.isAdmin || false
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password !== password) {
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
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    };

    res.json({ message: 'Login successful', user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));