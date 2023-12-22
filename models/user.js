const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lateReturnFine: { type: Number, default: 0 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, '#$$#');
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
