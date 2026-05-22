import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || 'edupulse-dev-secret', { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: user._id, name, email, xp: user.xp, rank: user.rank } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || 'edupulse-dev-secret', { expiresIn: '7d' });
  return res.json({ token, user: { id: user._id, name: user.name, email, xp: user.xp, rank: user.rank } });
});

export default router;
