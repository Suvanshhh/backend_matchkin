import jwt from 'jsonwebtoken';
import config from '../config.js';

export function createJWT(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
}

export function verifyJWT(token) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (e) {
    return null;
  }
}
