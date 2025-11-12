const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bitcoinWallet: {
    type: String,
    required: true
  },
  ethWallet: {
    type: String,
    required: true
  },
  dogeAddress: {
    type: String,
    required: true
  },
  refCode: {
    type: String,
    default: ''
  },
  balance: {
    type: Number,
    default: 10
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('investUser', userSchema);