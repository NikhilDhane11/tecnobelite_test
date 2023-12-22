const User = require('../models/User');


const signUp = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        message: "Email already registered, please sign in.",
        token: existingUser.tokens[0].token,
      });
    }

    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User(req.body);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Invalid credentials.' });
  }
};

module.exports = { signUp, signIn };
