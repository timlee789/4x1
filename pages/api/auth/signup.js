import bcrypt from 'bcrypt';
import User from '../../../models/Users';

import db from '../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, storename, email, password } = req.body;
  if (
    !name ||
    !storename ||
    !email ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }
  await db.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User exist already!' });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    storename,
    email,
    password: bcrypt.hashSync(password),
    isAdmin: false,
  });
  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    _id: user._id,
    name: user.name,
    storename: user.storename,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}
export default handler;
