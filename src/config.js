import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  otpTTL: parseInt(process.env.OTP_TTL || '300', 10)
};
