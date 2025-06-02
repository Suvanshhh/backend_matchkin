import express from 'express';
import User from '../models/User.js';
import { generateAndStoreOTP, verifyOTP } from '../utils/otpStore.js';
import { createJWT } from '../utils/jwt.js';
import config from '../config.js';

const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ detail: 'Email required' });
  const otp = generateAndStoreOTP(email, config.otpTTL);
  console.log(`OTP for ${email}: ${otp}`);
  res.json({ message: 'OTP sent (check console)' });
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!verifyOTP(email, otp)) {
    return res.status(400).json({ detail: 'Invalid or expired OTP' });
  }
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email });
  const token = createJWT({ email: user.email, role: user.role });
  res.json({ token });
});

export default router;
